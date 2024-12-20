import { ExtractedText } from '../extractors/TextExtractor';

export class WordDocument {
  private content: ExtractedText[];

  constructor(content: ExtractedText[]) {
    this.content = content;
  }

  async save(): Promise<Blob> {
    const docContent = this.formatContent();
    return new Blob([docContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
  }

  private formatContent(): string {
    let docContent = '';

    this.content.forEach(page => {
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
}