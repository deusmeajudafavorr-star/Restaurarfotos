/**
 * ImageKit CDN Integration Helper
 * CDN URL Endpoint: https://ik.imagekit.io/qujefgkmk
 * Public Key: public_OKM+2Gmck9T6VKjBOQKECQTrIng=
 */

export interface ImageKitUploadResult {
  success: boolean;
  fileId?: string;
  url?: string;
  thumbnailUrl?: string;
  name?: string;
  size?: number;
  error?: string;
}

export const IMAGEKIT_CONFIG = {
  publicKey: (import.meta as any).env?.VITE_IMAGEKIT_PUBLIC_KEY || 'public_OKM+2Gmck9T6VKjBOQKECQTrIng=',
  urlEndpoint: (import.meta as any).env?.VITE_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/qujefgkmk',
  imagekitId: (import.meta as any).env?.VITE_IMAGEKIT_ID || 'qujefgkmk',
};

/**
 * Converts a File/Blob to a base64 Data URL string
 */
function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a photo file directly to ImageKit CDN via secure server API endpoint
 * or via direct client fallback (ensuring success on Vercel, static hosting, etc).
 */
async function uploadDirectToImageKit(
  file: File | Blob,
  fileName: string,
  orderId?: string
): Promise<ImageKitUploadResult> {
  try {
    const rawOrderId = orderId || "PEDIDO";
    const cleanOrder = rawOrderId.replace(/[^a-zA-Z0-9]/g, "");

    const sanitizedOriginalName = fileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/_+/g, "_");

    const finalFileName = `pedido_${cleanOrder}_${sanitizedOriginalName}`;

    const privateKey =
      (import.meta as any).env?.VITE_IMAGEKIT_PRIVATE_KEY ||
      'private_nEYuxw2B5hhvtTdP92FefuQW4xc=';

    const basicAuthToken = btoa(privateKey + ":");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", finalFileName);
    formData.append("folder", "/restaurador-pedidos");
    formData.append("useUniqueFileName", "true");
    formData.append("tags", `pedido_${cleanOrder}`);

    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Upload direto no ImageKit realizado com sucesso:', data.url);
      return {
        success: true,
        fileId: data.fileId,
        url: data.url,
        thumbnailUrl: data.thumbnailUrl || data.url,
        name: data.name,
        size: data.size,
      };
    } else {
      console.error('Erro na API do ImageKit:', data);
      return {
        success: false,
        error: data.message || data.help || 'Falha ao salvar a imagem no ImageKit.',
      };
    }
  } catch (err: any) {
    console.error('Exceção no upload direto do ImageKit:', err);
    return {
      success: false,
      error: err.message || 'Erro ao conectar ao servidor do ImageKit.',
    };
  }
}

export async function uploadToImageKit(
  file: File | Blob,
  fileName: string,
  orderId?: string
): Promise<ImageKitUploadResult> {
  // 1. Tentar primeiro o endpoint de API do servidor (/api/imagekit/upload)
  try {
    const fileBase64 = await fileToBase64(file);

    const response = await fetch('/api/imagekit/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileBase64,
        fileName,
        orderId,
      }),
    });

    const contentType = response.headers.get('content-type');
    if (response.ok && contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (data.success) {
        return {
          success: true,
          fileId: data.fileId,
          url: data.url,
          thumbnailUrl: data.thumbnailUrl || data.url,
          name: data.name,
          size: data.size,
        };
      }
    }

    console.warn('API /api/imagekit/upload retornou erro ou não é JSON. Executando fallback de upload direto...');
  } catch (err) {
    console.warn('Falha na rota /api/imagekit/upload, executando upload direto para o ImageKit:', err);
  }

  // 2. Fallback direto no cliente (garante funcionamento no Vercel e hosts estáticos)
  return uploadDirectToImageKit(file, fileName, orderId);
}
