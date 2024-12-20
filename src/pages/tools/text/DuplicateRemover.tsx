import React, { useState } from 'react';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Eraser } from 'lucide-react';

export function DuplicateRemover() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ original: 0, unique: 0 });

  const removeDuplicates = () => {
    const lines = text.split('\n');
    const uniqueLines = Array.from(new Set(lines)).filter(line => line.trim());
    setText(uniqueLines.join('\n'));
    setStats({
      original: lines.length,
      unique: uniqueLines.length
    });
  };

  return (
    <ToolLayout
      title="Remove Duplicate Lines"
      description="Remove duplicate lines from your text while preserving order"
    >
      <div className="space-y-6">
        <TextArea
          value={text}
          onChange={setText}
          placeholder="Type or paste your text here..."
        />
        
        <div className="flex items-center justify-between">
          <Button
            onClick={removeDuplicates}
            icon={Eraser}
          >
            Remove Duplicates
          </Button>
          
          {stats.original > 0 && (
            <div className="text-sm text-gray-600">
              Removed {stats.original - stats.unique} duplicate lines
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}