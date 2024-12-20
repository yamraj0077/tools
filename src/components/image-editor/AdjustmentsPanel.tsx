import React from 'react';
import { Sliders } from 'lucide-react';
import { ImageAdjustments } from '../../types/image-editor';

interface AdjustmentsPanelProps {
  adjustments: ImageAdjustments;
  onAdjustmentChange: (key: keyof ImageAdjustments, value: number) => void;
}

export function AdjustmentsPanel({ adjustments, onAdjustmentChange }: AdjustmentsPanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <Sliders className="w-5 h-5 mr-2" />
        Adjustments
      </h3>
      
      {Object.entries(adjustments).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {key}: {value}
          </label>
          <input
            type="range"
            min={key === 'blur' ? 0 : 0}
            max={key === 'blur' ? 20 : 200}
            value={value}
            onChange={(e) => onAdjustmentChange(
              key as keyof ImageAdjustments,
              Number(e.target.value)
            )}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
}