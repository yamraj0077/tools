import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Type, List, Mail, Link, Hash } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import {
  reverseText,
  countWords,
  extractEmails,
  extractUrls,
  formatNumber
} from '../../../utils/text/stringManipulation';

type Operation = 'reverse' | 'extract-emails' | 'extract-urls' | 'format-numbers';

export function StringManipulator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [operation, setOperation] = useState<Operation>('reverse');

  const handleProcess = () => {
    switch (operation) {
      case 'reverse':
        setOutput(reverseText(input));
        break;
      case 'extract-emails':
        setOutput(extractEmails(input).join('\n'));
        break;
      case 'extract-urls':
        setOutput(extractUrls(input).join('\n'));
        break;
      case 'format-numbers':
        setOutput(formatNumber(input));
        break;
    }
  };

  return (
    <ToolLayout
      title="String Manipulator"
      description="Perform various text manipulation operations"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setOperation('reverse')}
            icon={Type}
            variant={operation === 'reverse' ? 'primary' : 'secondary'}
          >
            Reverse Text
          </Button>
          <Button
            onClick={() => setOperation('extract-emails')}
            icon={Mail}
            variant={operation === 'extract-emails' ? 'primary' : 'secondary'}
          >
            Extract Emails
          </Button>
          <Button
            onClick={() => setOperation('extract-urls')}
            icon={Link}
            variant={operation === 'extract-urls' ? 'primary' : 'secondary'}
          >
            Extract URLs
          </Button>
          <Button
            onClick={() => setOperation('format-numbers')}
            icon={Hash}
            variant={operation === 'format-numbers' ? 'primary' : 'secondary'}
          >
            Format Numbers
          </Button>
        </div>

        <Card className="p-4">
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Enter text to process..."
          />
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleProcess} icon={List}>
            Process Text
          </Button>
        </div>

        {output && (
          <Card className="p-4">
            <TextArea
              value={output}
              onChange={() => {}}
              className="font-mono"
              placeholder="Result will appear here..."
            />
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}