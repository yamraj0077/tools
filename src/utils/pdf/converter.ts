import { PDFDocument } from 'pdf-lib';
import { pdfService } from './pdfService';

export async function extractTextFromPDF(file: File): Promise<string[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfService.getDocument(arrayBuffer);
    const textContent: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items
        .map((item: any) => item.str)
        .join(' ')
        .trim();
      
      if (text) {
        textContent.push(text);
      }
    }

    if (textContent.length === 0) {
      throw new Error('No text content found in PDF');
    }

    return textContent;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to extract text from PDF'
    );
  }
}

export async function extractTablesFromPDF(file: File): Promise<string[][]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfService.getDocument(arrayBuffer);
    const tables: string[][] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      
      // Simple table detection based on content layout
      const lines = content.items
        .map((item: any) => item.str)
        .filter((str: string) => str.trim().length > 0);
      
      if (lines.length > 0) {
        tables.push(lines);
      }
    }

    if (tables.length === 0) {
      throw new Error('No table content found in PDF');
    }

    return tables;
  } catch (error) {
    console.error('Error extracting tables from PDF:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to extract tables from PDF'
    );
  }
}