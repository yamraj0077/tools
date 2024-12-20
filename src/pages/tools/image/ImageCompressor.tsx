import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { ImageIcon, Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { ImagePreview } from '../../../components/image/ImagePreview';
import { useImagePreview } from '../../../hooks/useImagePreview';
import { compressImage } from '../../../utils/file/compression';
import { downloadBlob } from '../../../utils/download';

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const previewUrl = useImagePreview(file);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      const compressedBlob = await compressImage(file, {
        quality,
        maxWidth: 1920,
        maxHeight: 1080
      });
      
      const filename = file.name.replace(/\.[^/.]+$/, '') + '_compressed.jpg';
      await downloadBlob(compressedBlob, filename);
    } catch (error) {
      console.error('Compression failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image file size while preserving quality"
    >
      <div className="space-y-6">
        <FileUpload
          id="image-upload"
          accept="image/*"
          icon={ImageIcon}
          label="Drop an image here or click to upload"
          onChange={handleFileChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImagePreview file={file} previewUrl={previewUrl} />

          {file && (
            <Card className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <Button 
                onClick={handleCompress} 
                icon={Download}
                disabled={isProcessing}
              >
                {isProcessing ? 'Compressing...' : 'Compress Image'}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}