import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Card } from '../../../components/common/Card';
import { Search, Settings } from 'lucide-react';

interface Match {
  text: string;
  index: number;
}

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState('');

  const handleTest = () => {
    try {
      setError('');
      const regex = new RegExp(pattern, flags);
      const newMatches: Match[] = [];
      let match;

      while ((match = regex.exec(text)) !== null) {
        newMatches.push({
          text: match[0],
          index: match.index
        });
        
        if (!flags.includes('g')) break;
      }

      setMatches(newMatches);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regular expression');
      setMatches([]);
    }
  };

  return (
    <ToolLayout
      title="Regular Expression Tester"
      description="Test and debug regular expressions with real-time matching"
    >
      <div className="space-y-6">
        <Card className="p-4 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pattern
              </label>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Enter regex pattern..."
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flags
              </label>
              <input
                type="text"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="g, i, m..."
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button onClick={handleTest} icon={Search}>
            Test Regular Expression
          </Button>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Test String</h3>
            <TextArea
              value={text}
              onChange={setText}
              placeholder="Enter text to test against..."
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Matches ({matches.length})</h3>
            <Card className="p-4 h-64 overflow-y-auto">
              {matches.length > 0 ? (
                <div className="space-y-2">
                  {matches.map((match, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded">
                      <div className="text-sm font-mono">{match.text}</div>
                      <div className="text-xs text-gray-500">
                        Index: {match.index}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center">
                  No matches found
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}