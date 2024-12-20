import React from 'react';
import { Layout } from 'lucide-react';
import { AspectRatioPreset, ImageDimensions } from '../../types/image-editor';
import { maintainAspectRatio, validateDimensions } from '../../utils/image-editor/dimensions';

interface LayoutPanelProps {
  dimensions: ImageDimensions;
  aspectRatio: AspectRatioPreset;
  onDimensionsChange: (dimensions: ImageDimensions) => void;
  onAspectRatioChange: (ratio: AspectRatioPreset) => void;
  maintainRatio: boolean;
  onMaintainRatioChange: (maintain: boolean) => void;
}

export function LayoutPanel({
  dimensions,
  aspectRatio,
  onDimensionsChange,
  onAspectRatioChange,
  maintainRatio,
  onMaintainRatioChange,
}: LayoutPanelProps) {
  const handleDimensionChange = (dimension: 'width' | 'height', value: number) => {
    const newValue = Math.max(1, value); // Ensure positive values
    
    let newDimensions: ImageDimensions;
    if (maintainRatio && aspectRatio === 'custom') {
      newDimensions = maintainAspectRatio(dimensions, newValue, dimension);
    } else {
      newDimensions = {
        ...dimensions,
        [dimension]: newValue
      };
    }
    
    onDimensionsChange(validateDimensions(newDimensions));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <Layout className="w-5 h-5 mr-2" />
        Layout
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Aspect Ratio
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(['1:1', '4:3', '16:9', '9:16', 'custom'] as const).map((ratio) => (
            <button
              key={ratio}
              onClick={() => onAspectRatioChange(ratio)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                aspectRatio === ratio
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {ratio.charAt(0).toUpperCase() + ratio.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Width (px)
            </label>
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange('width', parseInt(e.target.value) || 1)}
              min="1"
              max="8000"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (px)
            </label>
            <input
              type="number"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange('height', parseInt(e.target.value) || 1)}
              min="1"
              max="8000"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        {aspectRatio === 'custom' && (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={maintainRatio}
              onChange={(e) => onMaintainRatioChange(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Maintain aspect ratio</span>
          </label>
        )}
      </div>
    </div>
  );
}