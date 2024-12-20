import React from 'react';
import { MonitorSmartphone } from 'lucide-react';
import { TemplateCategory, ImageDimensions, AspectRatioPreset } from '../../types/image-editor';
import { TemplateButton } from './TemplateButton';

interface TemplatesPanelProps {
  category: TemplateCategory;
  onCategoryChange: (category: TemplateCategory) => void;
  onTemplateSelect: (dimensions: ImageDimensions, ratio: AspectRatioPreset) => void;
}

export function TemplatesPanel({
  category,
  onCategoryChange,
  onTemplateSelect,
}: TemplatesPanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <MonitorSmartphone className="w-5 h-5 mr-2" />
        Templates
      </h3>

      <div className="flex space-x-2">
        {(['social', 'business', 'custom'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              category === cat
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {category === 'social' && (
          <>
            <TemplateButton
              label="Instagram Post"
              dimensions="1080×1080"
              onClick={() => onTemplateSelect({ width: 1080, height: 1080 }, '1:1')}
            />
            <TemplateButton
              label="Instagram Story"
              dimensions="1080×1920"
              onClick={() => onTemplateSelect({ width: 1080, height: 1920 }, '9:16')}
            />
            <TemplateButton
              label="Facebook Post"
              dimensions="1200×630"
              onClick={() => onTemplateSelect({ width: 1200, height: 630 }, 'custom')}
            />
            <TemplateButton
              label="Twitter Post"
              dimensions="1600×900"
              onClick={() => onTemplateSelect({ width: 1600, height: 900 }, '16:9')}
            />
          </>
        )}

        {category === 'business' && (
          <>
            <TemplateButton
              label="LinkedIn Banner"
              dimensions="1584×396"
              onClick={() => onTemplateSelect({ width: 1584, height: 396 }, 'custom')}
            />
            <TemplateButton
              label="Email Header"
              dimensions="600×200"
              onClick={() => onTemplateSelect({ width: 600, height: 200 }, 'custom')}
            />
            <TemplateButton
              label="Presentation"
              dimensions="1920×1080"
              onClick={() => onTemplateSelect({ width: 1920, height: 1080 }, '16:9')}
            />
            <TemplateButton
              label="Business Card"
              dimensions="1050×600"
              onClick={() => onTemplateSelect({ width: 1050, height: 600 }, 'custom')}
            />
          </>
        )}
      </div>
    </div>
  );
}