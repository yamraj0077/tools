import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { ImageIcon, Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { ImagePreview } from '../../../components/image/ImagePreview';
import { useImagePreview } from '../../../hooks/useImagePreview';
import { resizeImage } from '../../../utils/image/resize';

interface Dimensions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
}

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 800,
    height: 600,
    maintainAspectRatio: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const previewUrl = useImagePreview(file);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
      
      // Get original dimensions when image is loaded
      const img = new Image();
      img.onload = () => {
        setDimensions(prev => ({
          ...prev,
          width: img.width,
          height: img.height
        }));
      };
      img.src = URL.createObjectURL(newFile);
    }
  };

  const handleResize = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      const resizedBlob = await resizeImage(file, dimensions);
      
      // Create download link
      const url = URL.createObjectURL(resizedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resized-${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error resizing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDimensionChange = (dimension: 'width' | 'height', value: number) => {
    if (dimensions.maintainAspectRatio && file) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        
        if (dimension === 'width') {
          setDimensions(prev => ({
            ...prev,
            width: value,
            height: Math.round(value / aspectRatio)
          }));
        } else {
          setDimensions(prev => ({
            ...prev,
            height: value,
            width: Math.round(value * aspectRatio)
          }));
        }
      };
      img.src = previewUrl || '';
    } else {
      setDimensions(prev => ({
        ...prev,
        [dimension]: value
      }));
    }
  };

  return (
    <ToolLayout
      title="Resize Image"
      description="Resize images to specific dimensions while maintaining quality"
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => handleDimensionChange('width', parseInt(e.target.value))}
                    min="1"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => handleDimensionChange('height', parseInt(e.target.value))}
                    min="1"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={dimensions.maintainAspectRatio}
                  onChange={(e) => setDimensions(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Maintain aspect ratio</span>
              </label>

              <Button 
                onClick={handleResize} 
                icon={Download}
                disabled={isProcessing}
              >
                {isProcessing ? 'Resizing...' : 'Resize & Download'}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}