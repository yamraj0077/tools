import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Code, Copy } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Tabs } from '../../../components/common/Tabs';
import { encodeBase64, decodeBase64, encodeUrl, decodeUrl, escapeHtml } from '../../../utils/text/textEncoding';

type EncodingType = 'base64' | 'url' | 'html';

export function TextEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [encodingType, setEncodingType] = useState<EncodingType>('base64');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleProcess = () => {
    try {
      setError('');
      let result = '';

      if (mode === 'encode') {
        switch (encodingType) {
          case 'base64':
            result = encodeBase64(input);
            break;
          case 'url':
            result = encodeUrl(input);
            break;
          case 'html':
            result = escapeHtml(input);
            break;
        }
      } else {
        switch (encodingType) {
          case 'base64':
            result = decodeBase64(input);
            break;
          case 'url':
            result = decodeUrl(input);
            break;
          case 'html':
            throw new Error('HTML decode not supported');
        }
      }

      setOutput(result);
    } catch (err) {
      setError('Invalid input for selected encoding');
      setOutput('');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="Text Encoder/Decoder"
      description="Encode and decode text in various formats"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs
            tabs={[
              { id: 'base64', label: 'Base64' },
              { id: 'url', label: 'URL' },
              { id: 'html', label: 'HTML Escape' },
            ]}
            activeTab={encodingType}
            onChange={(id) => setEncodingType(id as EncodingType)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                mode === 'encode'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                mode === 'decode'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={encodingType === 'html'}
            >
              Decode
            </button>
          </div>
        </div>

        <Card className="p-4">
          <TextArea
            value={input}
            onChange={setInput}
            placeholder={`Enter text to ${mode}...`}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleProcess} icon={Code}>
            {mode === 'encode' ? 'Encode' : 'Decode'} Text
          </Button>
        </div>

        {output && (
          <Card className="p-4">
            <div className="space-y-4">
              <TextArea
                value={output}
                onChange={() => {}}
                className="font-mono"
                placeholder="Result will appear here..."
              />
              <Button onClick={copyToClipboard} icon={Copy} variant="secondary">
                Copy Result
              </Button>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}