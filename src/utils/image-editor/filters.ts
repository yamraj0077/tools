import { ImageAdjustments } from '../../types/image-editor';

export function applyCanvasFilters(ctx: CanvasRenderingContext2D, adjustments: ImageAdjustments): void {
  // Reset any existing filters
  ctx.filter = 'none';
  
  // Apply new filters
  ctx.filter = [
    `brightness(${adjustments.brightness}%)`,
    `contrast(${adjustments.contrast}%)`,
    `saturate(${adjustments.saturation}%)`,
    `blur(${adjustments.blur}px)`,
    `opacity(${adjustments.opacity}%)`
  ].join(' ');
}