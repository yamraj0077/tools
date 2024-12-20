import { PDFDocument } from '../core/PDFDocument';
import { TextExtractor, ExtractedText } from '../extractors/TextExtractor';
import { WordDocument } from './WordDocument';

export class PDFToWordConverter {
  private textExtractor: TextExtractor;

  constructor() {
    this.textExtractor = new TextExtractor();
  }

  async convert(pdfDoc: PDFDocument): Promise<WordDocument> {
    const extractedText = await this.textExtractor.extractFromDocument(pdfDoc);
    return new WordDocument(extractedText);
  }
}

export const pdfToWordConverter = new PDFToWordConverter();