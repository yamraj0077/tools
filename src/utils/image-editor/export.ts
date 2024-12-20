export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<void> {
  try {
    canvas.toBlob(async (blob) => {
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
      }
    }, 'image/png');
  } catch (err) {
    console.error('Failed to copy image:', err);
    throw err;
  }
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string = 'edited-image.png'): void {
  // Convert canvas to blob and download
  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }, 'image/png');
}