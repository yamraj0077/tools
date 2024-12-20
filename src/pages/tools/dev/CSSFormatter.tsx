import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Code, Minimize2 } from 'lucide-react';
import { Card } from '../../../components/common/Card';

export function CSSFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const formatCSS = () => {
    try {
      // Basic CSS formatting
      const formatted = input
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/;\s*/g, ';\n  ')
        .replace(/,\s*/g, ', ')
        .replace(/\n\s*\n/g, '\n')
        .trim();
      
      setInput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid CSS format');
    }
  };

  const minifyCSS = () => {
    try {
      const minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .trim();
      
      setInput(minified);
      setError('');
    } catch (err) {
      setError('Invalid CSS format');
    }
  };

  return (
    <ToolLayout
      title="CSS Formatter"
      description="Format and beautify CSS code for better readability"
    >
      <div className="space-y-6">
        <TextArea
          value={input}
          onChange={(value) => {
            setInput(value);
            setError('');
          }}
          placeholder="Paste your CSS here..."
          className={`font-mono text-sm ${error ? 'border-red-300' : ''}`}
        />
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <div className="flex flex-wrap gap-4">
          <Button onClick={formatCSS} icon={Code}>
            Format CSS
          </Button>
          <Button onClick={minifyCSS} icon={Minimize2} variant="secondary">
            Minify CSS
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}