import * as PDFJS from 'pdfjs-dist';

export class PDFWorker {
  private static instance: PDFWorker;
  private initialized = false;

  private constructor() {}

  static getInstance(): PDFWorker {
    if (!PDFWorker.instance) {
      PDFWorker.instance = new PDFWorker();
    }
    return PDFWorker.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    
    try {
      await PDFJS.getDocument({ data: new Uint8Array() }).promise.catch(() => {});
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize PDF worker:', error);
      throw new Error('PDF service initialization failed');
    }
  }
}

export const pdfWorker = PDFWorker.getInstance();