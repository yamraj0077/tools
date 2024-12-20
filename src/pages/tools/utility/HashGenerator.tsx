import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Hash, Copy } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { generateHash, HASH_ALGORITHMS } from '../../../utils/crypto/hash';

export function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const handleGenerateHashes = async () => {
    const newHashes: Record<string, string> = {};
    
    for (const algorithm of HASH_ALGORITHMS) {
      newHashes[algorithm] = await generateHash(input, algorithm);
    }
    
    setHashes(newHashes);
  };

  const copyHash = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate secure hash values using various algorithms"
    >
      <div className="space-y-6">
        <Card>
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Enter text to generate hashes..."
          />
        </Card>

        <div className="flex justify-center">
          <Button onClick={handleGenerateHashes} icon={Hash}>
            Generate Hashes
          </Button>
        </div>

        {Object.entries(hashes).length > 0 && (
          <div className="space-y-4">
            {Object.entries(hashes).map(([type, hash]) => (
              <Card key={type} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">{type}</h3>
                    <p className="mt-1 font-mono text-sm text-gray-600 break-all">{hash}</p>
                  </div>
                  <Button
                    onClick={() => copyHash(hash)}
                    icon={Copy}
                    variant="secondary"
                  >
                    Copy
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}