import { PDFDocument } from '../core/PDFDocument';
import { PDFPageProxy } from 'pdfjs-dist';
import { TextContent } from 'pdfjs-dist/types/src/display/api';

export interface TextStructure {
  paragraphs: string[];
  headers: string[];
  lists: string[][];
}

export interface ExtractedText {
  pageNumber: number;
  content: string;
  structure: TextStructure;
}

export class TextExtractor {
  private static readonly HEADER_PATTERNS = [
    /^[A-Z\s]{2,}$/,
    /^[A-Z][a-z\s]{2,}$/
  ];

  async extractFromDocument(doc: PDFDocument): Promise<ExtractedText[]> {
    const pageCount = await doc.getPageCount();
    const extractedPages: ExtractedText[] = [];

    for (let i = 1; i <= pageCount; i++) {
      const page = await doc.getPage(i);
      const extractedText = await this.extractFromPage(page);
      extractedPages.push(extractedText);
    }

    return extractedPages;
  }

  private async extractFromPage(page: PDFPageProxy): Promise<ExtractedText> {
    try {
      const textContent = await page.getTextContent();
      const rawText = this.processTextItems(textContent);
      const structure = this.analyzeStructure(rawText);

      return {
        pageNumber: page.pageNumber,
        content: rawText,
        structure
      };
    } catch (error) {
      throw new Error(`Failed to extract text from page ${page.pageNumber}`);
    }
  }

  private processTextItems(textContent: TextContent): string {
    return textContent.items
      .map((item: any) => item.str)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private analyzeStructure(text: string): TextStructure {
    const lines = text.split(/\n/);
    const structure: TextStructure = {
      paragraphs: [],
      headers: [],
      lists: [],
    };

    let currentParagraph = '';
    let currentList: string[] = [];

    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        if (currentParagraph) {
          structure.paragraphs.push(currentParagraph);
          currentParagraph = '';
        }
        if (currentList.length) {
          structure.lists.push(currentList);
          currentList = [];
        }
        return;
      }

      // Check if line is a header
      if (TextExtractor.HEADER_PATTERNS.some(pattern => pattern.test(trimmedLine))) {
        structure.headers.push(trimmedLine);
        return;
      }

      // Check if line is a list item
      if (/^[\u2022\-\*]\s/.test(trimmedLine)) {
        currentList.push(trimmedLine.replace(/^[\u2022\-\*]\s/, ''));
        return;
      }

      // Add to current paragraph
      currentParagraph += (currentParagraph ? ' ' : '') + trimmedLine;
    });

    // Add any remaining content
    if (currentParagraph) {
      structure.paragraphs.push(currentParagraph);
    }
    if (currentList.length) {
      structure.lists.push(currentList);
    }

    return structure;
  }
}