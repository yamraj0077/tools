import { PDFDocument } from '../core/PDFDocument';
import { pdfLoader } from '../core/PDFLoader';
import { ConversionProgress, ConversionResult, PDFError } from '../core/types';

export class PDFConverter {
  async convertToWord(
    file: File,
    onProgress?: (progress: ConversionProgress) => void
  ): Promise<ConversionResult> {
    try {
      // Update progress
      onProgress?.({
        status: 'loading',
        progress: 10,
        message: 'Loading PDF document...'
      });

      // Load the PDF
      const pdfDoc = await pdfLoader.loadDocument(file);
      
      onProgress?.({
        status: 'processing',
        progress: 30,
        message: 'Extracting content...'
      });

      // Extract text content from all pages
      const numPages = pdfDoc.numPages;
      const textContent: string[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        const text = content.items
          .map((item: any) => item.str)
          .join(' ')
          .trim();
        
        if (text) {
          textContent.push(text);
        }

        onProgress?.({
          status: 'processing',
          progress: 30 + (i / numPages) * 40,
          message: `Processing page ${i} of ${numPages}...`
        });
      }

      // Convert to HTML format
      onProgress?.({
        status: 'processing',
        progress: 80,
        message: 'Converting to Word format...'
      });

      const htmlContent = this.convertToHtml(textContent);
      
      // Create downloadable blob
      const blob = new Blob([htmlContent], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });

      onProgress?.({
        status: 'complete',
        progress: 100,
        message: 'Conversion complete'
      });

      return {
        blob,
        filename: file.name.replace('.pdf', '.docx')
      };
    } catch (error) {
      const pdfError: PDFError = new Error('Conversion failed');
      pdfError.code = 'CONVERSION_FAILED';
      pdfError.details = error instanceof Error ? error.message : 'Unknown error';
      
      onProgress?.({
        status: 'error',
        progress: 0,
        message: pdfError.message
      });
      
      throw pdfError;
    }
  }

  private convertToHtml(textContent: string[]): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            p { margin: 1em 0; }
          </style>
        </head>
        <body>
          ${textContent.map(text => `<p>${text}</p>`).join('\n')}
        </body>
      </html>
    `;
  }
}

export const pdfConverter = new PDFConverter();