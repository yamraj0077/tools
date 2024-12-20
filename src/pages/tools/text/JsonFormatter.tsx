import React, { useState } from 'react';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Code, Copy } from 'lucide-react';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate and minify JSON data"
    >
      <div className="space-y-6">
        <TextArea
          value={input}
          onChange={(value) => {
            setInput(value);
            setError('');
          }}
          placeholder="Paste your JSON here..."
          className={error ? 'border-red-300' : ''}
        />
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={formatJson}
            icon={Code}
          >
            Format JSON
          </Button>
          <Button
            onClick={minifyJson}
            icon={Copy}
            variant="secondary"
          >
            Minify JSON
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}