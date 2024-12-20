import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { TextArea } from '../../../components/tools/TextArea';
import { Button } from '../../../components/tools/Button';
import { Key, Copy } from 'lucide-react';
import { Card } from '../../../components/common/Card';

interface JWTPayload {
  [key: string]: any;
}

export function JWTDecoder() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState<JWTPayload | null>(null);
  const [error, setError] = useState('');

  const decodeToken = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const payload = JSON.parse(atob(parts[1]));
      setDecoded(payload);
      setError('');
    } catch (err) {
      setError('Invalid JWT token');
      setDecoded(null);
    }
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
      title="JWT Decoder"
      description="Decode and inspect JWT tokens"
    >
      <div className="space-y-6">
        <Card className="p-4">
          <TextArea
            value={token}
            onChange={setToken}
            placeholder="Paste your JWT token here..."
            className="font-mono text-sm"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </Card>

        <div className="flex justify-center">
          <Button onClick={decodeToken} icon={Key}>
            Decode Token
          </Button>
        </div>

        {decoded && (
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Decoded Payload</h3>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify(decoded, null, 2)}
                </pre>
              </div>

              {decoded.exp && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Expiration</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {new Date(decoded.exp * 1000).toLocaleString()}
                  </p>
                </div>
              )}

              <Button onClick={() => copyToClipboard(JSON.stringify(decoded, null, 2))} icon={Copy} variant="secondary">
                Copy Decoded Payload
              </Button>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}