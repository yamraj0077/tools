import { ImageAdjustments, ImageDimensions, AspectRatioPreset } from '../types/image-editor';

export function applyImageAdjustments(
  ctx: CanvasRenderingContext2D,
  adjustments: ImageAdjustments
): void {
  ctx.filter = `
    brightness(${adjustments.brightness}%)
    contrast(${adjustments.contrast}%)
    saturate(${adjustments.saturation}%)
    blur(${adjustments.blur}px)
    opacity(${adjustments.opacity}%)
  `;
}

export function calculateAspectRatioDimensions(
  currentWidth: number,
  ratio: AspectRatioPreset
): ImageDimensions {
  if (ratio === 'custom') {
    return { width: currentWidth, height: currentWidth };
  }

  const [width, height] = ratio.split(':').map(Number);
  return {
    width: currentWidth,
    height: Math.round(currentWidth * (height / width))
  };
}

export async function copyImageToClipboard(canvas: HTMLCanvasElement): Promise<void> {
  try {
    const blob = await new Promise<Blob>((resolve) => 
      canvas.toBlob(blob => resolve(blob!))
    );
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  } catch (err) {
    console.error('Failed to copy image:', err);
    throw err;
  }
}

export function downloadImage(canvas: HTMLCanvasElement, filename: string = 'edited-image.png'): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
}