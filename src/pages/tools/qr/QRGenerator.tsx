import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Button } from '../../../components/tools/Button';
import { QrCode, Link, Mail, Phone, Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import QRCode from 'qrcode';

type QRType = 'url' | 'text' | 'email' | 'phone';

interface QROptions {
  width: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
}

export function QRGenerator() {
  const [type, setType] = useState<QRType>('url');
  const [content, setContent] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [options, setOptions] = useState<QROptions>({
    width: 300,
    margin: 4,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });

  const getPlaceholder = () => {
    switch (type) {
      case 'url': return 'https://example.com';
      case 'email': return 'example@email.com';
      case 'phone': return '+1234567890';
      default: return 'Enter your text here';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'url': return Link;
      case 'email': return Mail;
      case 'phone': return Phone;
      default: return QrCode;
    }
  };

  const formatContent = () => {
    switch (type) {
      case 'url':
        return content;
      case 'email':
        return `mailto:${content}`;
      case 'phone':
        return `tel:${content}`;
      default:
        return content;
    }
  };

  const generateQRCode = async () => {
    if (!content) return;

    try {
      const formattedContent = formatContent();
      const dataUrl = await QRCode.toDataURL(formattedContent, {
        width: options.width,
        margin: options.margin,
        color: options.color
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  };

  useEffect(() => {
    if (content) {
      generateQRCode();
    }
  }, [content, type, options]);

  const downloadQRCode = () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes for URLs, text, email, or phone numbers"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex space-x-4">
              {(['url', 'text', 'email', 'phone'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    type === t
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={getPlaceholder()}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    value={options.width}
                    onChange={(e) => setOptions({ ...options, width: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="color"
                    value={options.color.dark}
                    onChange={(e) => setOptions({
                      ...options,
                      color: { ...options.color, dark: e.target.value }
                    })}
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {qrDataUrl && (
          <Card className="p-6 text-center">
            <div className="mb-4">
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                className="max-w-[300px] mx-auto"
              />
            </div>
            <Button onClick={downloadQRCode} icon={Download}>
              Download QR Code
            </Button>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}