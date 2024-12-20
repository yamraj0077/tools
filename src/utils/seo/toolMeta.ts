export interface ToolMeta {
  title: string;
  description: string;
  keywords: string[];
}

export const toolMeta: Record<string, ToolMeta> = {
  // PDF Tools
  'pdf/merge': {
    title: 'Merge PDF Files Online - Free PDF Combiner Tool',
    description: 'Combine multiple PDF files into one document online. Free, fast, and secure PDF merger tool. No registration required. Best PDF joiner tool.',
    keywords: ['merge pdf', 'combine pdf', 'pdf joiner', 'pdf combiner', 'free pdf merger', 'join pdf files', 'merge pdf online']
  },
  'pdf/split': {
    title: 'Split PDF Files Online - Free PDF Splitter Tool',
    description: 'Split PDF files into multiple documents online. Extract pages from PDF files easily. Free and secure PDF splitter tool.',
    keywords: ['split pdf', 'pdf splitter', 'extract pdf pages', 'separate pdf', 'pdf divider', 'split pdf online']
  },
  'pdf/compress': {
    title: 'Compress PDF Files Online - Free PDF Size Reducer',
    description: 'Reduce PDF file size while maintaining quality. Free online PDF compression tool. Optimize PDF files for web or email.',
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'optimize pdf', 'shrink pdf', 'pdf size reducer']
  },

  // Image Tools
  'image/compress': {
    title: 'Compress Images Online - Free Image Optimization Tool',
    description: 'Compress and optimize images online while maintaining quality. Support for JPG, PNG, and WebP formats. Free image compression tool.',
    keywords: ['compress image', 'image compression', 'reduce image size', 'optimize images', 'image compressor', 'photo optimizer']
  },
  'image/convert': {
    title: 'Convert Image Format Online - Free Image Converter',
    description: 'Convert images between different formats online. Support for JPG, PNG, WebP, and more. Fast and free image format converter.',
    keywords: ['convert image', 'image converter', 'change image format', 'jpg to png', 'png to webp', 'image format converter']
  },
  'image/resize': {
    title: 'Resize Images Online - Free Image Resizer Tool',
    description: 'Resize images online while maintaining aspect ratio. Change image dimensions easily. Free and professional image resizing tool.',
    keywords: ['resize image', 'image resizer', 'change image size', 'scale image', 'image dimensions', 'photo resizer']
  },

  // Text Tools
  'text/word-counter': {
    title: 'Word Counter Online - Free Text Analysis Tool',
    description: 'Count words, characters, sentences and paragraphs in your text. Free online word counter with detailed text statistics.',
    keywords: ['word counter', 'character counter', 'text analyzer', 'word count tool', 'letter counter', 'text statistics']
  },
  'text/case-converter': {
    title: 'Text Case Converter - Free Online Text Transformation Tool',
    description: 'Convert text case online - uppercase, lowercase, title case, and sentence case. Free text case converter tool.',
    keywords: ['case converter', 'text case', 'uppercase converter', 'lowercase converter', 'title case generator']
  },

  // Developer Tools
  'dev/json-formatter': {
    title: 'JSON Formatter and Validator - Free Online JSON Tools',
    description: 'Format, validate and beautify JSON data online. Free JSON formatter with syntax highlighting and error detection.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'format json', 'json parser', 'pretty print json']
  },
  'dev/html-formatter': {
    title: 'HTML Formatter and Beautifier - Free Online HTML Tools',
    description: 'Format and beautify HTML code online. Free HTML formatter with syntax highlighting and minification options.',
    keywords: ['html formatter', 'html beautifier', 'format html', 'pretty print html', 'html prettifier']
  },

  // Default meta for homepage and unlisted pages
  'default': {
    title: 'Free Online Tools - Web Developer Utilities & Converters',
    description: 'Free online tools for developers and designers. Convert, compress, and manipulate files with ease. PDF tools, image editors, text utilities and more.',
    keywords: ['online tools', 'web tools', 'developer tools', 'free tools', 'online utilities', 'file converter']
  }
};

export function getToolMeta(path: string): ToolMeta {
  return toolMeta[path] || toolMeta.default;
}