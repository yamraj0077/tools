import { ImageDimensions, AspectRatioPreset } from '../../types/image-editor';

export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  ratio: AspectRatioPreset
): ImageDimensions {
  if (ratio === 'custom') {
    return { width: originalWidth, height: originalHeight };
  }

  const [w, h] = ratio.split(':').map(Number);
  return {
    width: originalWidth,
    height: Math.round(originalWidth * (h / w))
  };
}