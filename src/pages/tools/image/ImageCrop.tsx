import React, { useState, useRef } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { Crop, Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { ImagePreview } from '../../../components/image/ImagePreview';
import { useImagePreview } from '../../../hooks/useImagePreview';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function ImageCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewUrl = useImagePreview(file);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCrop = () => {
    if (!canvasRef.current || !file) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      ctx.drawImage(
        img,
        cropArea.x, cropArea.y, cropArea.width, cropArea.height,
        0, 0, cropArea.width, cropArea.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'cropped-image.png';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    };

    img.src = previewUrl || '';
  };

  return (
    <ToolLayout
      title="Crop Image"
      description="Crop and adjust image dimensions precisely"
    >
      <div className="space-y-6">
        <FileUpload
          id="image-upload"
          accept="image/*"
          icon={Crop}
          label="Drop an image here or click to upload"
          onChange={handleFileChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImagePreview file={file} previewUrl={previewUrl} />

          {file && (
            <Card className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    value={cropArea.width}
                    onChange={(e) => setCropArea({ ...cropArea, width: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height
                  </label>
                  <input
                    type="number"
                    value={cropArea.height}
                    onChange={(e) => setCropArea({ ...cropArea, height: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <Button onClick={handleCrop} icon={Download}>
                Crop & Download
              </Button>
            </Card>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolLayout>
  );
}