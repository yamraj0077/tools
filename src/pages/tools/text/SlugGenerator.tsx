import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Link2, Copy, RefreshCw } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { generateSlug, validateSlug } from '../../../utils/text/slugGenerator';

export function SlugGenerator() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const handleGenerateSlug = () => {
    if (!input.trim()) {
      setError('Please enter some text');
      return;
    }

    const newSlug = generateSlug(input);
    if (validateSlug(newSlug)) {
      setSlug(newSlug);
      setError('');
    } else {
      setError('Invalid input for slug generation');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(slug);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="URL Slug Generator"
      description="Generate clean, SEO-friendly URLs from text"
    >
      <div className="space-y-6">
        <Card className="p-4">
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Enter text to generate a URL slug..."
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleGenerateSlug} icon={Link2}>
            Generate Slug
          </Button>
        </div>

        {slug && (
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-lg">{slug}</p>
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} icon={Copy} variant="secondary">
                    Copy
                  </Button>
                  <Button onClick={handleGenerateSlug} icon={RefreshCw} variant="secondary">
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}