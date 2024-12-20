import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { FileUp, Scissors } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { splitPDF } from '../../../utils/pdf/merger';
import { downloadBlob } from '../../../utils/download';

export function PDFSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRanges, setPageRanges] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSplit = async () => {
    if (!file || !pageRanges) return;

    try {
      setIsProcessing(true);
      const splitPdfs = await splitPDF(file, pageRanges);
      
      // Download each split PDF
      for (let i = 0; i < splitPdfs.length; i++) {
        const blob = new Blob([splitPdfs[i]], { type: 'application/pdf' });
        const filename = file.name.replace('.pdf', `_part${i + 1}.pdf`);
        await downloadBlob(blob, filename);
      }
    } catch (error) {
      console.error('Failed to split PDF:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Split PDF"
      description="Split PDF files into multiple documents by page ranges"
    >
      <div className="space-y-6">
        <FileUpload
          id="pdf-upload"
          accept=".pdf"
          icon={FileUp}
          label="Drop a PDF file here or click to upload"
          onChange={handleFileChange}
        />

        {file && (
          <Card className="space-y-4">
            <div>
              <h3 className="font-medium">Selected File:</h3>
              <p className="text-sm text-gray-600">{file.name}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Page Ranges (e.g., 1-3, 4-6)
              </label>
              <input
                type="text"
                value={pageRanges}
                onChange={(e) => setPageRanges(e.target.value)}
                placeholder="1-3, 4-6, 7-9"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <p className="text-xs text-gray-500">
                Enter page ranges separated by commas. Example: 1-3, 4-6 will create two PDFs
              </p>
            </div>

            <Button
              onClick={handleSplit}
              icon={Scissors}
              disabled={isProcessing || !pageRanges}
            >
              {isProcessing ? 'Splitting...' : 'Split PDF'}
            </Button>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}