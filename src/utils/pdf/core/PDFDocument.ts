import * as PDFJS from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist';

// Configure worker
const WORKER_URL = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

PDFJS.GlobalWorkerOptions.workerSrc = WORKER_URL;

export class PDFDocument {
  private doc: PDFDocumentProxy;

  constructor(doc: PDFDocumentProxy) {
    this.doc = doc;
  }

  static async load(file: File): Promise<PDFDocument> {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = PDFJS.getDocument({ data: arrayBuffer });
    const doc = await loadingTask.promise;
    return new PDFDocument(doc);
  }

  async getPageCount(): Promise<number> {
    return this.doc.numPages;
  }

  async getPage(pageNumber: number) {
    return this.doc.getPage(pageNumber);
  }

  getDocument(): PDFDocumentProxy {
    return this.doc;
  }
}