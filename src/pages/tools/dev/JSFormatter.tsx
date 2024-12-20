import React, { useState } from 'react';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Code, Minimize2 } from 'lucide-react';
import { formatJavaScript, minifyJavaScript } from '../../../utils/formatting/jsFormatter';

export function JSFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      const formatted = formatJavaScript(input);
      setInput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid JavaScript format');
    }
  };

  const handleMinify = () => {
    try {
      const minified = minifyJavaScript(input);
      setInput(minified);
      setError('');
    } catch (err) {
      setError('Invalid JavaScript format');
    }
  };

  return (
    <ToolLayout
      title="JavaScript Formatter"
      description="Format and beautify JavaScript code for better readability"
    >
      <div className="space-y-6">
        <TextArea
          value={input}
          onChange={(value) => {
            setInput(value);
            setError('');
          }}
          placeholder="Paste your JavaScript code here..."
          className={`font-mono text-sm ${error ? 'border-red-300' : ''}`}
        />
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleFormat} icon={Code}>
            Format JavaScript
          </Button>
          <Button onClick={handleMinify} icon={Minimize2} variant="secondary">
            Minify JavaScript
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}