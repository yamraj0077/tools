import * as PDFJS from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist';

// Configure worker
const WORKER_URL = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

PDFJS.GlobalWorkerOptions.workerSrc = WORKER_URL;

export class PDFLoader {
  private static instance: PDFLoader;
  private initialized = false;

  private constructor() {}

  static getInstance(): PDFLoader {
    if (!PDFLoader.instance) {
      PDFLoader.instance = new PDFLoader();
    }
    return PDFLoader.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Load and initialize the worker
      await PDFJS.getDocument({ data: new Uint8Array() }).promise.catch(() => {});
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize PDF worker:', error);
      throw new Error('PDF service initialization failed');
    }
  }

  async loadDocument(file: File): Promise<PDFDocumentProxy> {
    await this.init();
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = PDFJS.getDocument({ data: arrayBuffer });
      return await loadingTask.promise;
    } catch (error) {
      console.error('Failed to load PDF document:', error);
      throw new Error('Failed to load PDF document. Please ensure the file is a valid PDF.');
    }
  }
}

export const pdfLoader = PDFLoader.getInstance();