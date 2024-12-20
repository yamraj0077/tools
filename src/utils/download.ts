export async function downloadBlob(blob: Blob, filename: string) {
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append link to body, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
}

export function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  return downloadBlob(blob, filename);
}

export async function downloadImage(dataUrl: string, filename: string) {
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return downloadBlob(blob, filename);
  } catch (error) {
    console.error('Error downloading image:', error);
    throw error;
  }
}