import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Button } from '../../../components/tools/Button';
import { Type, Copy, Settings } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { generateLorem, LoremOptions } from '../../../utils/text/loremIpsum';

export function LoremIpsum() {
  const [options, setOptions] = useState<LoremOptions>({
    paragraphs: 3,
    wordsPerParagraph: 50,
    startWithLorem: true,
  });
  const [text, setText] = useState<string[]>([]);

  const handleGenerate = () => {
    setText(generateLorem(options));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text.join('\n\n'));
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Options
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paragraphs: {options.paragraphs}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={options.paragraphs}
                  onChange={(e) => setOptions({ ...options, paragraphs: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Words per Paragraph: {options.wordsPerParagraph}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={options.wordsPerParagraph}
                  onChange={(e) => setOptions({ ...options, wordsPerParagraph: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.startWithLorem}
                onChange={(e) => setOptions({ ...options, startWithLorem: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Start with "Lorem ipsum"
              </span>
            </label>

            <Button onClick={handleGenerate} icon={Type}>
              Generate Text
            </Button>
          </div>
        </Card>

        {text.length > 0 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="prose max-w-none">
                {text.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <Button onClick={copyToClipboard} icon={Copy} variant="secondary">
                Copy All Text
              </Button>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}