import * as PDFJS from 'pdfjs-dist';
import { PDFError } from './types';

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
      const workerSrc = '/assets/pdf.worker.min.js';
      PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
      
      // Test worker availability
      const response = await fetch(workerSrc);
      if (!response.ok) {
        throw new Error('PDF worker not available');
      }
      
      this.initialized = true;
    } catch (error) {
      const pdfError: PDFError = new Error('PDF service initialization failed');
      pdfError.code = 'INIT_FAILED';
      pdfError.details = error instanceof Error ? error.message : 'Unknown error';
      throw pdfError;
    }
  }

  async loadDocument(file: File): Promise<PDFJS.PDFDocumentProxy> {
    await this.init();
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = PDFJS.getDocument({ data: arrayBuffer });
      return await loadingTask.promise;
    } catch (error) {
      const pdfError: PDFError = new Error('Failed to load PDF document');
      pdfError.code = 'LOAD_FAILED';
      pdfError.details = error instanceof Error ? error.message : 'Invalid PDF file';
      throw pdfError;
    }
  }
}

export const pdfLoader = PDFLoader.getInstance();