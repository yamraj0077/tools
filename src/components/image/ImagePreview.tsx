import React from 'react';
import { Card } from '../common/Card';

interface ImagePreviewProps {
  file: File | null;
  previewUrl: string | null;
  className?: string;
}

export function ImagePreview({ file, previewUrl, className = '' }: ImagePreviewProps) {
  if (!file || !previewUrl) return null;

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-2">
        <div className="aspect-square w-full max-h-[400px] overflow-hidden rounded-lg">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-sm text-gray-600">
          <p>Name: {file.name}</p>
          <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>Type: {file.type}</p>
        </div>
      </div>
    </Card>
  );
}