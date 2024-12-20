import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { FileText, Table } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { extractTablesFromPDF } from '../../../utils/pdf/converter';
import { downloadText } from '../../../utils/download';

export function PDFToExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    try {
      setIsConverting(true);
      const tables = await extractTablesFromPDF(file);
      
      // Convert tables to CSV format
      const csv = tables
        .map(table => table.join(','))
        .join('\n');
      
      // Download as CSV file
      const filename = file.name.replace('.pdf', '.csv');
      await downloadText(csv, filename);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <ToolLayout
      title="PDF to Excel Converter"
      description="Extract tables from PDF files to Excel spreadsheets"
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
            </div>

            <Button
              onClick={handleConvert}
              icon={Table}
              disabled={isConverting}
            >
              {isConverting ? 'Extracting Tables...' : 'Extract Tables to Excel'}
            </Button>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}