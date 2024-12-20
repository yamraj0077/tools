import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Card } from '../../../components/common/Card';
import { FileEdit, Copy, Download } from 'lucide-react';
import { markdownToHtml } from '../../../utils/text/markdown';

const DEFAULT_MARKDOWN = `# Markdown Editor

## Basic Syntax Guide

### Text Formatting
**Bold text** and *italic text*

### Lists
* Unordered list item 1
* Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2

### Links
[Visit OpenAI](https://openai.com)

### Code
Inline \`code\` and code blocks:

\`\`\`
function hello() {
  console.log('Hello, world!');
}
\`\`\`

### Blockquotes
> This is a blockquote

### Horizontal Rule
---

Start editing to see the preview!`;

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(markdownToHtml(markdown));
    } catch (err) {
      console.error('Failed to copy HTML:', err);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([markdownToHtml(markdown)], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Markdown Editor"
      description="Write and preview Markdown with real-time rendering"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FileEdit className="w-5 h-5 mr-2" />
              Editor
            </h2>
            <TextArea
              value={markdown}
              onChange={setMarkdown}
              placeholder="Write your Markdown here..."
              className="font-mono min-h-[600px]"
            />
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Preview</h2>
              <div className="flex gap-2">
                <Button onClick={copyHtml} icon={Copy} variant="secondary">
                  Copy HTML
                </Button>
                <Button onClick={downloadHtml} icon={Download} variant="secondary">
                  Download HTML
                </Button>
              </div>
            </div>
            <div 
              className="prose max-w-none min-h-[600px] p-4 bg-white rounded-lg border border-gray-200"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
            />
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}