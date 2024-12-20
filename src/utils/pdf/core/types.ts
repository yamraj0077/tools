export interface PDFError extends Error {
  code?: string;
  details?: string;
}

export interface ConversionProgress {
  status: 'loading' | 'processing' | 'complete' | 'error';
  progress: number;
  message: string;
}

export interface ConversionResult {
  blob: Blob;
  filename: string;
}