import React from 'react';

interface TemplateButtonProps {
  label: string;
  dimensions: string;
  onClick: () => void;
}

export function TemplateButton({ label, dimensions, onClick }: TemplateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-left"
    >
      <div className="text-sm font-medium text-gray-900">{label}</div>
      <div className="text-xs text-gray-500">{dimensions}</div>
    </button>
  );
}