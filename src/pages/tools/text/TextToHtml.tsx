import React, { useState } from 'react';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Code2, Copy } from 'lucide-react';

export function TextToHtml() {
  const [text, setText] = useState('');
  const [html, setHtml] = useState('');

  const convertToHtml = () => {
    const converted = text
      .split('\n\n')
      .map(paragraph => `<p>${paragraph.trim()}</p>`)
      .join('\n');
    setHtml(converted);
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="Text to HTML"
      description="Convert plain text to HTML markup with proper formatting"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Input Text</h2>
          <TextArea
            value={text}
            onChange={setText}
            placeholder="Type or paste your text here..."
          />
          <Button
            onClick={convertToHtml}
            icon={Code2}
          >
            Convert to HTML
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">HTML Output</h2>
          <TextArea
            value={html}
            onChange={setHtml}
            placeholder="HTML output will appear here..."
            className="font-mono text-sm"
          />
          <Button
            onClick={copyHtml}
            icon={Copy}
            variant="secondary"
          >
            Copy HTML
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}