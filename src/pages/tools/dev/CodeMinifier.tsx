import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Minimize2, Copy } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Tabs } from '../../../components/common/Tabs';

type CodeType = 'html' | 'css' | 'javascript';

export function CodeMinifier() {
  const [code, setCode] = useState('');
  const [minified, setMinified] = useState('');
  const [codeType, setCodeType] = useState<CodeType>('html');

  const minifyCode = () => {
    let result = '';

    switch (codeType) {
      case 'html':
        result = code
          .replace(/\s+/g, ' ')
          .replace(/>\s+</g, '><')
          .replace(/<!--.*?-->/g, '')
          .trim();
        break;

      case 'css':
        result = code
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\s+/g, ' ')
          .replace(/\s*([{}:;,])\s*/g, '$1')
          .trim();
        break;

      case 'javascript':
        result = code
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\/\/.*/g, '')
          .replace(/\s+/g, ' ')
          .replace(/\s*([{}:;,=])\s*/g, '$1')
          .trim();
        break;
    }

    setMinified(result);
  };

  const copyMinified = async () => {
    try {
      await navigator.clipboard.writeText(minified);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="Code Minifier"
      description="Minify HTML, CSS, and JavaScript code to reduce file size"
    >
      <div className="space-y-6">
        <Tabs
          tabs={[
            { id: 'html', label: 'HTML' },
            { id: 'css', label: 'CSS' },
            { id: 'javascript', label: 'JavaScript' },
          ]}
          activeTab={codeType}
          onChange={(id) => setCodeType(id as CodeType)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Original Code</h3>
            <TextArea
              value={code}
              onChange={setCode}
              placeholder={`Paste your ${codeType.toUpperCase()} code here...`}
              className="font-mono text-sm"
            />
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Minified Code</h3>
            <TextArea
              value={minified}
              onChange={() => {}}
              placeholder="Minified code will appear here..."
              className="font-mono text-sm"
            />
          </Card>
        </div>

        <div className="flex gap-4">
          <Button onClick={minifyCode} icon={Minimize2}>
            Minify Code
          </Button>
          {minified && (
            <Button onClick={copyMinified} icon={Copy} variant="secondary">
              Copy Minified Code
            </Button>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}