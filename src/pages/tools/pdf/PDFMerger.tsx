import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { FileUp, Combine } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { mergePDFs } from '../../../utils/pdf/merger';
import { downloadBlob } from '../../../utils/download';

export function PDFMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) return;

    try {
      setIsProcessing(true);
      const mergedPdfBytes = await mergePDFs(files);
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      await downloadBlob(blob, 'merged.pdf');
    } catch (error) {
      console.error('Failed to merge PDFs:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Merge PDF Files"
      description="Combine multiple PDF files into a single document"
    >
      <div className="space-y-6">
        <FileUpload
          id="pdf-upload"
          accept=".pdf"
          multiple
          icon={FileUp}
          label="Drop PDF files here or click to upload"
          onChange={handleFileChange}
        />

        {files.length > 0 && (
          <Card className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Selected Files:</h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={handleMerge}
              icon={Combine}
              disabled={isProcessing || files.length < 2}
            >
              {isProcessing ? 'Merging...' : `Merge ${files.length} PDF${files.length !== 1 ? 's' : ''}`}
            </Button>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}