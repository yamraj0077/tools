import * as PDFJS from 'pdfjs-dist';

// Configure the worker URL to use the local worker file
PDFJS.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.js';

// Initialize PDF.js with better error handling
class PDFService {
  private initialized = false;

  async init() {
    if (this.initialized) return;
    
    try {
      // Test the worker is available
      await fetch(PDFJS.GlobalWorkerOptions.workerSrc);
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize PDF worker:', error);
      throw new Error('PDF service initialization failed');
    }
  }

  async getDocument(data: ArrayBuffer) {
    await this.init();
    return PDFJS.getDocument({ data }).promise;
  }
}

export const pdfService = new PDFService();