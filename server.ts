import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON and urlencoded body payloads up to 50MB for image base64 uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Direct ImageKit API Upload Proxy
  app.post("/api/imagekit/upload", async (req, res) => {
    try {
      const { fileBase64, fileName, orderId } = req.body;

      if (!fileBase64 || !fileName) {
        return res.status(400).json({
          success: false,
          error: "Campos 'fileBase64' e 'fileName' são obrigatórios.",
        });
      }

      // 1. Sanitize filename strictly: remove #, special symbols, spaces, accents
      const rawOrderId = orderId || "PEDIDO";
      const cleanOrder = rawOrderId.replace(/[^a-zA-Z0-9]/g, "");
      
      const sanitizedOriginalName = fileName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove diacritics / accents
        .replace(/[^a-zA-Z0-9._-]/g, "_") // replace remaining non-alphanumeric with _
        .replace(/_+/g, "_"); // condense consecutive underscores

      const finalFileName = `pedido_${cleanOrder}_${sanitizedOriginalName}`;

      // 2. Prepare Private Key Basic Auth
      const privateKey =
        process.env.IMAGEKIT_PRIVATE_KEY ||
        "private_nEYuxw2B5hhvtTdP92FefuQW4xc=";
      const basicAuthToken = Buffer.from(privateKey + ":").toString("base64");

      // 3. Construct FormData for ImageKit Upload REST API
      const formData = new FormData();
      formData.append("file", fileBase64);
      formData.append("fileName", finalFileName);
      formData.append("folder", "/restaurador-pedidos");
      formData.append("useUniqueFileName", "true");
      formData.append("tags", `pedido_${cleanOrder}`);

      // 4. Call ImageKit API
      const ikResponse = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuthToken}`,
          },
          body: formData,
        }
      );

      const ikData = await ikResponse.json();

      if (ikResponse.ok) {
        console.log("ImageKit Upload Sucesso:", ikData.url);
        return res.json({
          success: true,
          fileId: ikData.fileId,
          url: ikData.url,
          thumbnailUrl: ikData.thumbnailUrl || ikData.url,
          name: ikData.name,
          size: ikData.size,
          folder: ikData.filePath,
        });
      } else {
        console.error("Erro retornado do ImageKit API:", ikData);
        return res.status(ikResponse.status).json({
          success: false,
          error:
            ikData.message ||
            ikData.help ||
            "Não foi possível salvar na API do ImageKit.",
        });
      }
    } catch (err: any) {
      console.error("Exceção ao processar upload ImageKit:", err);
      return res.status(500).json({
        success: false,
        error: err.message || "Erro interno no servidor de upload ImageKit",
      });
    }
  });

  // Vite Middleware in dev vs Static Serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();
