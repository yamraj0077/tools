import React, { useState } from 'react';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Code, Copy, Minimize2 } from 'lucide-react';

export function HtmlFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const formatHtml = () => {
    try {
      // Simple HTML formatting logic
      const formatted = input
        .replace(/>\s+</g, '>\n<') // Add newline between tags
        .replace(/(<[^>]+>)/g, (match) => {
          return match.replace(/\s+/g, ' '); // Remove extra spaces in tags
        })
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
      
      setInput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid HTML format');
    }
  };

  const minifyHtml = () => {
    try {
      const minified = input
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
      
      setInput(minified);
      setError('');
    } catch (err) {
      setError('Invalid HTML format');
    }
  };

  return (
    <ToolLayout
      title="HTML Formatter"
      description="Format and beautify HTML code for better readability"
    >
      <div className="space-y-6">
        <TextArea
          value={input}
          onChange={(value) => {
            setInput(value);
            setError('');
          }}
          placeholder="Paste your HTML here..."
          className={`font-mono text-sm ${error ? 'border-red-300' : ''}`}
        />
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={formatHtml}
            icon={Code}
          >
            Format HTML
          </Button>
          <Button
            onClick={minifyHtml}
            icon={Minimize2}
            variant="secondary"
          >
            Minify HTML
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}