import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { FileText, Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { PDFDocument } from 'pdf-lib';

interface CompressionSettings {
  quality: number;
  imageCompression: boolean;
  removeMetadata: boolean;
}

export function PDFCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 80,
    imageCompression: true,
    removeMetadata: true,
  });
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    try {
      setIsCompressing(true);
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      if (settings.removeMetadata) {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('');
        pdfDoc.setCreator('');
      }

      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
      });

      const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.replace('.pdf', '_compressed.pdf');
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to compress PDF:', error);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <ToolLayout
      title="PDF Compressor"
      description="Reduce PDF file size while maintaining quality"
    >
      <div className="space-y-6">
        <FileUpload
          id="pdf-upload"
          accept=".pdf"
          icon={FileText}
          label="Drop a PDF file here or click to upload"
          onChange={handleFileChange}
        />

        {file && (
          <Card className="space-y-4">
            <div>
              <h3 className="font-medium">Selected File:</h3>
              <p className="text-sm text-gray-600">{file.name}</p>
              <p className="text-sm text-gray-600">
                Size: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compression Quality: {settings.quality}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={settings.quality}
                  onChange={(e) => setSettings({ ...settings, quality: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.imageCompression}
                    onChange={(e) => setSettings({ ...settings, imageCompression: e.target.checked })}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Compress images in PDF
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.removeMetadata}
                    onChange={(e) => setSettings({ ...settings, removeMetadata: e.target.checked })}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Remove PDF metadata
                  </span>
                </label>
              </div>
            </div>

            <Button
              onClick={handleCompress}
              icon={Download}
              disabled={isCompressing}
            >
              {isCompressing ? 'Compressing...' : 'Compress PDF'}
            </Button>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}