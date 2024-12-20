export interface ResizeDimensions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
}

export async function resizeImage(file: File, dimensions: ResizeDimensions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let { width, height } = dimensions;

      // Set canvas size to desired dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw image with new dimensions
      ctx?.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to resize image'));
          }
        },
        file.type,
        1.0
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}