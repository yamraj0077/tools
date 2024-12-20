const words = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua'
];

export interface LoremOptions {
  paragraphs?: number;
  wordsPerParagraph?: number;
  startWithLorem?: boolean;
}

export function generateLorem({
  paragraphs = 1,
  wordsPerParagraph = 50,
  startWithLorem = true,
}: LoremOptions = {}): string[] {
  const result: string[] = [];

  for (let i = 0; i < paragraphs; i++) {
    let paragraph: string[] = [];
    
    // Start with "Lorem ipsum" if it's the first paragraph and startWithLorem is true
    if (i === 0 && startWithLorem) {
      paragraph = ['Lorem', 'ipsum'];
    }

    while (paragraph.length < wordsPerParagraph) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      paragraph.push(randomWord);
    }

    result.push(paragraph.join(' ') + '.');
  }

  return result;
}