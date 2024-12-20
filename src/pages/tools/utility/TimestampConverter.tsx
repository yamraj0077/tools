import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Button } from '../../../components/tools/Button';
import { Clock, Copy } from 'lucide-react';
import { Card } from '../../../components/common/Card';

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [format, setFormat] = useState<'unix' | 'iso'>('unix');
  const [converted, setConverted] = useState<Record<string, string>>({});

  const handleConvert = () => {
    try {
      let date: Date;
      if (format === 'unix') {
        date = new Date(parseInt(timestamp) * 1000);
      } else {
        date = new Date(timestamp);
      }

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      setConverted({
        'Unix Timestamp': Math.floor(date.getTime() / 1000).toString(),
        'ISO 8601': date.toISOString(),
        'Local Date': date.toLocaleDateString(),
        'Local Time': date.toLocaleTimeString(),
        'UTC': date.toUTCString(),
        'Relative': getRelativeTime(date)
      });
    } catch (err) {
      setConverted({ error: 'Invalid timestamp format' });
    }
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
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
      title="Timestamp Converter"
      description="Convert between different timestamp formats"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Input Format
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setFormat('unix')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    format === 'unix'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Unix Timestamp
                </button>
                <button
                  onClick={() => setFormat('iso')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    format === 'iso'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  ISO 8601
                </button>
              </div>
            </div>

            <div>
              <input
                type="text"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder={format === 'unix' ? '1625097600' : '2021-07-01T00:00:00Z'}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <Button onClick={handleConvert} icon={Clock}>
              Convert Timestamp
            </Button>
          </div>
        </Card>

        {Object.entries(converted).length > 0 && (
          <div className="space-y-2">
            {Object.entries(converted).map(([key, value]) => (
              <Card key={key} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">{key}</h3>
                    <p className="mt-1 font-mono text-sm text-gray-600">{value}</p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(value)}
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