import { Route } from '../types/routes';

export const qrRoutes: Route[] = [
  {
    path: '/qr/generate',
    title: 'Generate QR Code',
    description: 'Create QR codes for text, URLs, or contact information',
  },
  {
    path: '/qr/scan',
    title: 'Scan QR Code',
    description: 'Scan and decode QR codes from images',
  },
];