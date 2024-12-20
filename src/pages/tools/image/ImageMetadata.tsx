import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { ImageIcon } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { getImageMetadata, ImageMetadata } from '../../../utils/image/metadata';

export function ImageMetadataViewer() {
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        const meta = await getImageMetadata(e.target.files[0]);
        setMetadata(meta);
        setError('');
      } catch (err) {
        setError('Failed to read image metadata');
        setMetadata(null);
      }
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <ToolLayout
      title="Image Metadata Viewer"
      description="View detailed information about your images"
    >
      <div className="space-y-6">
        <FileUpload
          id="image-upload"
          accept="image/*"
          icon={ImageIcon}
          label="Drop an image here or click to upload"
          onChange={handleFileChange}
        />

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {metadata && (
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Image Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Dimensions</p>
                <p className="mt-1 text-sm text-gray-900">
                  {metadata.width} × {metadata.height} pixels
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Format</p>
                <p className="mt-1 text-sm text-gray-900">{metadata.format}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">File Size</p>
                <p className="mt-1 text-sm text-gray-900">{formatSize(metadata.size)}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Aspect Ratio</p>
                <p className="mt-1 text-sm text-gray-900">
                  {(metadata.width / metadata.height).toFixed(2)}:1
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}