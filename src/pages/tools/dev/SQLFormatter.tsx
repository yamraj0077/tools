import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Database, Copy } from 'lucide-react';
import { Card } from '../../../components/common/Card';

export function SQLFormatter() {
  const [sql, setSql] = useState('');
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState('');

  const formatSQL = () => {
    try {
      // Basic SQL formatting
      const formattedSQL = sql
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',\n  ')
        .replace(/\s*SELECT\s+/gi, 'SELECT\n  ')
        .replace(/\s*FROM\s+/gi, '\nFROM\n  ')
        .replace(/\s*WHERE\s+/gi, '\nWHERE\n  ')
        .replace(/\s*AND\s+/gi, '\n  AND ')
        .replace(/\s*OR\s+/gi, '\n  OR ')
        .replace(/\s*ORDER BY\s+/gi, '\nORDER BY\n  ')
        .replace(/\s*GROUP BY\s+/gi, '\nGROUP BY\n  ')
        .replace(/\s*HAVING\s+/gi, '\nHAVING\n  ')
        .replace(/\s*JOIN\s+/gi, '\nJOIN\n  ')
        .replace(/\s*LEFT JOIN\s+/gi, '\nLEFT JOIN\n  ')
        .replace(/\s*RIGHT JOIN\s+/gi, '\nRIGHT JOIN\n  ')
        .replace(/\s*INNER JOIN\s+/gi, '\nINNER JOIN\n  ')
        .replace(/\s*OUTER JOIN\s+/gi, '\nOUTER JOIN\n  ')
        .trim();

      setFormatted(formattedSQL);
      setError('');
    } catch (err) {
      setError('Invalid SQL query');
      setFormatted('');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="SQL Formatter"
      description="Format and beautify SQL queries"
    >
      <div className="space-y-6">
        <Card className="p-4">
          <TextArea
            value={sql}
            onChange={setSql}
            placeholder="Enter your SQL query here..."
            className="font-mono text-sm"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </Card>

        <div className="flex justify-center">
          <Button onClick={formatSQL} icon={Database}>
            Format SQL
          </Button>
        </div>

        {formatted && (
          <Card className="p-4">
            <div className="space-y-4">
              <TextArea
                value={formatted}
                onChange={() => {}}
                className="font-mono text-sm"
                placeholder="Formatted SQL will appear here..."
              />
              <Button onClick={copyToClipboard} icon={Copy} variant="secondary">
                Copy Formatted SQL
              </Button>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}