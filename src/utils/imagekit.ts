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
 */
export async function uploadToImageKit(
  file: File | Blob,
  fileName: string,
  orderId?: string
): Promise<ImageKitUploadResult> {
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

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        fileId: data.fileId,
        url: data.url,
        thumbnailUrl: data.thumbnailUrl || data.url,
        name: data.name,
        size: data.size,
      };
    } else {
      console.error('Erro retornado pela API do servidor ImageKit:', data);
      return {
        success: false,
        error: data.error || 'Falha ao salvar a imagem no ImageKit.',
      };
    }
  } catch (err: any) {
    console.error('Exceção ao fazer upload para o ImageKit:', err);
    return {
      success: false,
      error: err.message || 'Erro ao conectar ao servidor de upload.',
    };
  }
}
