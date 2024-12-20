import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { GitCompare } from 'lucide-react';
import { computeDiff, DiffResult } from '../../../utils/text/diff';

export function DiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<DiffResult[]>([]);

  const handleCompare = () => {
    const result = computeDiff(text1, text2);
    setDiff(result);
  };

  return (
    <ToolLayout
      title="Diff Checker"
      description="Compare two texts and highlight the differences"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Original Text</h3>
            <TextArea
              value={text1}
              onChange={setText1}
              placeholder="Paste your original text here..."
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Modified Text</h3>
            <TextArea
              value={text2}
              onChange={setText2}
              placeholder="Paste your modified text here..."
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleCompare} icon={GitCompare}>
            Compare Texts
          </Button>
        </div>

        {diff.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 font-mono text-sm">
            {diff.map((d, i) => (
              <div
                key={i}
                className={`${
                  d.type === 'add'
                    ? 'bg-green-50 text-green-700'
                    : d.type === 'remove'
                    ? 'bg-red-50 text-red-700'
                    : ''
                } py-1 px-2`}
              >
                {d.type === 'add' ? '+ ' : d.type === 'remove' ? '- ' : '  '}
                {d.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}