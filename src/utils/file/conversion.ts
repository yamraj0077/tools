import { downloadBlob } from '../download';

export async function convertImageFormat(file: File, format: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image'));
          }
        },
        `image/${format.toLowerCase()}`
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

export async function saveAsFormat(blob: Blob, filename: string, format: string) {
  const newFilename = filename.replace(/\.[^/.]+$/, '') + '.' + format.toLowerCase();
  await downloadBlob(blob, newFilename);
}