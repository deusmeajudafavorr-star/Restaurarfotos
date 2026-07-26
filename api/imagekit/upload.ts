import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido' });
  }

  try {
    const { fileBase64, fileName, orderId } = req.body || {};

    if (!fileBase64 || !fileName) {
      return res.status(400).json({
        success: false,
        error: "Campos 'fileBase64' e 'fileName' são obrigatórios.",
      });
    }

    const rawOrderId = orderId || "PEDIDO";
    const cleanOrder = rawOrderId.replace(/[^a-zA-Z0-9]/g, "");

    const sanitizedOriginalName = fileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/_+/g, "_");

    const finalFileName = `pedido_${cleanOrder}_${sanitizedOriginalName}`;

    const privateKey =
      process.env.IMAGEKIT_PRIVATE_KEY ||
      "private_nEYuxw2B5hhvtTdP92FefuQW4xc=";
    const basicAuthToken = Buffer.from(privateKey + ":").toString("base64");

    const formData = new FormData();
    formData.append("file", fileBase64);
    formData.append("fileName", finalFileName);
    formData.append("folder", "/restaurador-pedidos");
    formData.append("useUniqueFileName", "true");
    formData.append("tags", `pedido_${cleanOrder}`);

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
      return res.status(200).json({
        success: true,
        fileId: ikData.fileId,
        url: ikData.url,
        thumbnailUrl: ikData.thumbnailUrl || ikData.url,
        name: ikData.name,
        size: ikData.size,
        folder: ikData.filePath,
      });
    } else {
      return res.status(ikResponse.status || 500).json({
        success: false,
        error:
          ikData.message ||
          ikData.help ||
          "Erro ao salvar na API do ImageKit.",
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message || "Erro interno no servidor de upload ImageKit",
    });
  }
}
