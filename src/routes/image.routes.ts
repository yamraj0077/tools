import { Route } from '../types/routes';

export const imageRoutes: Route[] = [
  {
    path: '/image/compress',
    title: 'Compress Image',
    description: 'Reduce image file size while preserving quality',
  },
  {
    path: '/image/convert',
    title: 'Convert Image',
    description: 'Convert images between different formats',
  },
  {
    path: '/image/resize',
    title: 'Resize Image',
    description: 'Change image dimensions while maintaining aspect ratio',
  },
  {
    path: '/image/crop',
    title: 'Crop Image',
    description: 'Crop and adjust image dimensions',
  },
  {
    path: '/image/metadata',
    title: 'Image Metadata',
    description: 'View detailed information about your images',
  },
  {
    path: '/image/editor',
    title: 'Image Editor',
    description: 'Edit and enhance your images with various effects',
  },
];