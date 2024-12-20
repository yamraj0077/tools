export interface ImageEffects {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  rotation: number;
}

export function applyImageEffects(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  effects: ImageEffects
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas dimensions
  canvas.width = image.width;
  canvas.height = image.height;

  // Apply rotation
  if (effects.rotation) {
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(effects.rotation * Math.PI/180);
    ctx.translate(-canvas.width/2, -canvas.height/2);
  }

  // Draw image
  ctx.drawImage(image, 0, 0);

  // Apply filters
  ctx.filter = `
    brightness(${effects.brightness}%)
    contrast(${effects.contrast}%)
    saturate(${effects.saturation}%)
    blur(${effects.blur}px)
  `;
}