import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Button } from '../../../components/tools/Button';
import { Palette, Copy } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { hexToRgb, rgbToHsl, ColorFormat, RGBColor, HSLColor } from '../../../utils/color/converter';

export function ColorConverter() {
  const [color, setColor] = useState('#000000');
  const [format, setFormat] = useState<ColorFormat>('hex');

  const getRgbString = (rgb: RGBColor) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const getHslString = (hsl: HSLColor) => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const getConvertedValues = () => {
    try {
      const rgb = hexToRgb(color);
      const hsl = rgbToHsl(rgb);
      return {
        hex: color,
        rgb: getRgbString(rgb),
        hsl: getHslString(hsl),
      };
    } catch (err) {
      return null;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const values = getConvertedValues();

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between different formats (HEX, RGB, HSL)"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pick a color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-12 w-full rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex space-x-4">
              {(['hex', 'rgb', 'hsl'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    format === f
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {values && (
          <div className="space-y-4">
            {Object.entries(values).map(([key, value]) => (
              <Card key={key} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {key.toUpperCase()}
                    </h3>
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

        <div className="mt-6">
          <div className="h-24 rounded-lg shadow-inner" style={{ backgroundColor: color }} />
        </div>
      </div>
    </ToolLayout>
  );
}