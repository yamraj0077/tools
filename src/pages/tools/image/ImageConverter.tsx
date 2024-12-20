import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { ImageIcon, ArrowRight } from 'lucide-react';
import { ImagePreview } from '../../../components/image/ImagePreview';
import { useImagePreview } from '../../../hooks/useImagePreview';
import { convertImageFormat, saveAsFormat } from '../../../utils/file/conversion';

const SUPPORTED_FORMATS = ['PNG', 'JPEG', 'WEBP'];

export function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('PNG');
  const [isConverting, setIsConverting] = useState(false);
  const previewUrl = useImagePreview(file);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    try {
      setIsConverting(true);
      const convertedBlob = await convertImageFormat(file, targetFormat);
      await saveAsFormat(convertedBlob, file.name, targetFormat);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolLayout
      title="Convert Image Format"
      description="Convert images between different formats while preserving quality"
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
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Format
                </label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {SUPPORTED_FORMATS.map(format => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </select>
              </div>

              <Button 
                onClick={handleConvert} 
                icon={ArrowRight}
                disabled={isConverting}
              >
                {isConverting ? 'Converting...' : `Convert to ${targetFormat}`}
              </Button>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}