import { ExtractedText } from '../extractors/textExtractor';

export class WordConverter {
  convertToDocx(extractedText: ExtractedText[]): string {
    let docContent = '';

    extractedText.forEach(page => {
      // Add headers
      page.structure.headers.forEach(header => {
        docContent += `# ${header}\n\n`;
      });

      // Add paragraphs
      page.structure.paragraphs.forEach(paragraph => {
        docContent += `${paragraph}\n\n`;
      });

      // Add lists
      page.structure.lists.forEach(list => {
        list.forEach(item => {
          docContent += `• ${item}\n`;
        });
        docContent += '\n';
      });

      // Add page break
      docContent += '\n---\n\n';
    });

    return docContent;
  }

  async generateDownloadableDocx(content: string): Promise<Blob> {
    // In a real implementation, we would use a library like docx-js
    // For now, we'll return a simple text file with .docx extension
    return new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  }
}

export const wordConverter = new WordConverter();