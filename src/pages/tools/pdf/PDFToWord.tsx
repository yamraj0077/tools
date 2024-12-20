import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { FileText, Download, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { pdfConverter } from '../../../utils/pdf/conversion/PDFConverter';
import type { ConversionProgress } from '../../../utils/pdf/core/types';

interface ConversionError {
  message: string;
  details?: string;
}

export function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<ConversionError | null>(null);
  const [progress, setProgress] = useState<ConversionProgress | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const newFile = e.target.files[0];
      if (newFile.type !== 'application/pdf') {
        setError({ message: 'Please select a valid PDF file' });
        return;
      }
      setFile(newFile);
      setError(null);
      setProgress(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    try {
      setIsConverting(true);
      setError(null);

      const result = await pdfConverter.convertToWord(file, (progress) => {
        setProgress(progress);
      });

      // Download file
      const url = URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Conversion failed:', err);
      setError({
        message: 'Failed to convert PDF',
        details: err instanceof Error ? err.message : 'An unexpected error occurred'
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolLayout
      title="PDF to Word Converter"
      description="Convert PDF files to editable Word documents"
    >
      <div className="space-y-6">
        <FileUpload
          id="pdf-upload"
          accept=".pdf"
          icon={FileText}
          label="Drop a PDF file here or click to upload"
          onChange={handleFileChange}
        />

        {error && (
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">{error.message}</p>
                {error.details && (
                  <p className="text-sm mt-1">{error.details}</p>
                )}
              </div>
            </div>
          </Card>
        )}

        {file && !error && (
          <Card className="p-4 space-y-4">
            <div>
              <h3 className="font-medium">Selected File:</h3>
              <p className="text-sm text-gray-600">{file.name}</p>
            </div>

            {progress && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  {progress.message}
                </p>
              </div>
            )}

            <Button
              onClick={handleConvert}
              icon={Download}
              disabled={isConverting}
            >
              {isConverting ? 'Converting...' : 'Convert to Word'}
            </Button>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}