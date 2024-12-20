import { Route } from '../types/routes';

export const pdfRoutes: Route[] = [
  {
    path: '/pdf/to-word',
    title: 'PDF to Word',
    description: 'Convert PDF files to editable Word documents',
  },
  {
    path: '/pdf/to-excel',
    title: 'PDF to Excel',
    description: 'Extract tables from PDF files to Excel spreadsheets',
  },
  {
    path: '/pdf/merge',
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one document',
  },
  {
    path: '/pdf/split',
    title: 'Split PDF',
    description: 'Split PDF files into multiple documents',
  },
  {
    path: '/pdf/compress',
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
  },
];