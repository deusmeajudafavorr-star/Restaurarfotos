export type AppStep = 'upload' | 'processing' | 'success';

export interface ProcessingStep {
  id: number;
  icon: string;
  label: string;
  completed: boolean;
}

export interface ImageKitStatus {
  isUploading?: boolean;
  uploadedUrl?: string;
  fileId?: string;
  error?: string;
}

export interface OrderInfo {
  orderId: string;
  whatsappNumber: string;
  createdDate: string;
  photoName: string;
  imagekitUrl?: string;
}

