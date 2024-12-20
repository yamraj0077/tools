import {
  FileText,
  Image,
  Type,
  Video,
  Code,
  QrCode,
  Settings,
} from 'lucide-react';
import { Tool } from '../types/tools';

export const tools: Tool[] = [
  {
    title: 'PDF Tools',
    description: 'Convert, compress, merge and split PDF files with ease',
    icon: FileText,
  },
  {
    title: 'Image Tools',
    description: 'Compress, resize, and convert images between formats',
    icon: Image,
  },
  {
    title: 'Text Tools',
    description: 'Format, convert, and analyze text content',
    icon: Type,
  },
  {
    title: 'Media Tools',
    description: 'Convert and compress video and audio files',
    icon: Video,
  },
  {
    title: 'Developer Tools',
    description: 'Format and validate code, generate assets',
    icon: Code,
  },
  {
    title: 'QR Tools',
    description: 'Generate and scan QR codes instantly',
    icon: QrCode,
  },
  {
    title: 'Utilities',
    description: 'Various helpful tools for everyday tasks',
    icon: Settings,
  },
];