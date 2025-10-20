// Types for WebP file processing
export interface ConversionFile {
  id: string;
  file: File;
  name: string;
  size: number;
  status: 'waiting' | 'converting' | 'done' | 'failed';
  error?: string;
  convertedBlob?: Blob;
  thumbnail?: string;
}

export interface ConversionProgress {
  total: number;
  completed: number;
  failed: number;
}