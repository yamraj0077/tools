import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Button } from '../../../components/tools/Button';
import { RefreshCw, Copy } from 'lucide-react';
import { Card } from '../../../components/common/Card';

export function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random UUIDs/GUIDs"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of UUIDs to generate
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <Button onClick={handleGenerate} icon={RefreshCw}>
              Generate UUIDs
            </Button>
          </div>
        </Card>

        {uuids.length > 0 && (
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <code className="font-mono text-sm">{uuid}</code>
                  <Button
                    onClick={() => copyToClipboard(uuid)}
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