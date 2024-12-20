import React, { useRef, useEffect, useState } from 'react';
import { ImageAdjustments, ImageDimensions } from '../../types/image-editor';
import { applyCanvasFilters } from '../../utils/image-editor/filters';

interface CanvasProps {
  image: string | null;
  adjustments: ImageAdjustments;
  dimensions: ImageDimensions;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
}

export function Canvas({ image, adjustments, dimensions, onCanvasReady }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  // Load image
  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.onload = () => setImageObj(img);
    img.src = image;

    return () => {
      img.onload = null;
      setImageObj(null);
    };
  }, [image]);

  // Handle canvas rendering
  useEffect(() => {
    if (!imageObj || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate scaling to maintain aspect ratio
    const scale = Math.min(
      dimensions.width / imageObj.width,
      dimensions.height / imageObj.height
    );

    const scaledWidth = imageObj.width * scale;
    const scaledHeight = imageObj.height * scale;
    const x = (dimensions.width - scaledWidth) / 2;
    const y = (dimensions.height - scaledHeight) / 2;

    // Save context state
    ctx.save();

    // Apply filters
    applyCanvasFilters(ctx, adjustments);

    // Draw image
    ctx.drawImage(
      imageObj,
      x, y,
      scaledWidth,
      scaledHeight
    );

    // Restore context state
    ctx.restore();

    // Notify parent component
    onCanvasReady(canvas);
  }, [imageObj, dimensions, adjustments, onCanvasReady]);

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto mx-auto"
        style={{ 
          maxHeight: '70vh',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}