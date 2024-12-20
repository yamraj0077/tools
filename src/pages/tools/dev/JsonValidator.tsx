import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Code, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/common/Card';

export function JsonValidator() {
  const [input, setInput] = useState('');
  const [validation, setValidation] = useState<{
    isValid: boolean;
    error?: string;
    lineNumber?: number;
  }>({ isValid: true });

  const validateJson = () => {
    try {
      if (!input.trim()) {
        setValidation({ isValid: false, error: 'Please enter JSON to validate' });
        return;
      }

      JSON.parse(input);
      setValidation({ isValid: true });
    } catch (err) {
      const error = err as SyntaxError;
      const match = error.message.match(/at position (\d+)/);
      const position = match ? parseInt(match[1]) : 0;
      
      // Calculate line number from position
      const lineNumber = input.substring(0, position).split('\n').length;
      
      setValidation({
        isValid: false,
        error: error.message,
        lineNumber
      });
    }
  };

  return (
    <ToolLayout
      title="JSON Validator"
      description="Validate and check JSON syntax for errors"
    >
      <div className="space-y-6">
        <Card className="p-4">
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Paste your JSON here..."
            className={`font-mono ${!validation.isValid ? 'border-red-300' : ''}`}
          />
        </Card>

        <div className="flex justify-between items-center">
          <Button onClick={validateJson} icon={Code}>
            Validate JSON
          </Button>

          {!validation.isValid && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {validation.error}
              {validation.lineNumber && ` (Line ${validation.lineNumber})`}
            </div>
          )}

          {validation.isValid && input && (
            <div className="text-green-500 text-sm">
              ✓ Valid JSON
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}