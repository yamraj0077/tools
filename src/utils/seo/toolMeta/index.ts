import { pdfToolsMeta } from './pdfTools';
import { imageToolsMeta } from './imageTools';
import { textToolsMeta } from './textTools';
import { devToolsMeta } from './devTools';
import { utilityToolsMeta } from './utilityTools';

export interface ToolMeta {
  title: string;
  description: string;
  keywords: string[];
}

const defaultMeta: ToolMeta = {
  title: 'Free Online Tools - Web Developer Utilities & Converters',
  description: 'Free online tools for developers and designers. Convert, compress, and manipulate files with ease. PDF tools, image editors, text utilities and more.',
  keywords: ['online tools', 'web tools', 'developer tools', 'free tools', 'online utilities', 'file converter']
};

export const toolMeta: Record<string, ToolMeta> = {
  ...pdfToolsMeta,
  ...imageToolsMeta,
  ...textToolsMeta,
  ...devToolsMeta,
  ...utilityToolsMeta,
  'default': defaultMeta
};

export function getToolMeta(path: string): ToolMeta {
  return toolMeta[path] || toolMeta.default;
}