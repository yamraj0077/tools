import React, { useState } from 'react';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { ArrowUpDown, Type } from 'lucide-react';

export function CaseConverter() {
  const [text, setText] = useState('');

  const convertCase = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(
          text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
        );
        break;
      case 'sentence':
        setText(
          text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (c) => c.toUpperCase())
        );
        break;
    }
  };

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between different letter cases"
    >
      <div className="space-y-6">
        <TextArea
          value={text}
          onChange={setText}
          placeholder="Type or paste your text here..."
        />
        
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => convertCase('upper')}
            icon={ArrowUpDown}
          >
            UPPERCASE
          </Button>
          <Button
            onClick={() => convertCase('lower')}
            icon={ArrowUpDown}
          >
            lowercase
          </Button>
          <Button
            onClick={() => convertCase('title')}
            icon={Type}
          >
            Title Case
          </Button>
          <Button
            onClick={() => convertCase('sentence')}
            icon={Type}
          >
            Sentence case
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}