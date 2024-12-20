import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { ArrowDownUp, Copy } from 'lucide-react';
import { Tabs } from '../../../components/common/Tabs';
import { Card } from '../../../components/common/Card';

type Mode = 'encode' | 'decode';

export function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError('');
    } catch (err) {
      setError(mode === 'encode' ? 'Invalid input' : 'Invalid Base64 string');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Convert text to and from Base64 encoding"
    >
      <div className="space-y-6">
        <Tabs
          tabs={[
            { id: 'encode', label: 'Encode' },
            { id: 'decode', label: 'Decode' },
          ]}
          activeTab={mode}
          onChange={(id) => setMode(id as Mode)}
        />

        <Card>
          <TextArea
            value={input}
            onChange={setInput}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className={error ? 'border-red-300' : ''}
          />
          
          {error && (
            <div className="mt-2 text-red-500 text-sm">{error}</div>
          )}
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleConvert} icon={ArrowDownUp}>
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </Button>
        </div>

        {output && (
          <Card>
            <div className="space-y-4">
              <TextArea
                value={output}
                onChange={() => {}}
                className="font-mono"
                placeholder="Result will appear here..."
              />
              <Button onClick={handleCopy} icon={Copy} variant="secondary">
                Copy Result
              </Button>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}