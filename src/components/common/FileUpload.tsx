import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FileUploadProps {
  id: string;
  accept: string;
  multiple?: boolean;
  icon: LucideIcon;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUpload({ id, accept, multiple, icon: Icon, label, onChange }: FileUploadProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <input
        type="file"
        id={id}
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="cursor-pointer flex flex-col items-center"
      >
        <Icon className="h-12 w-12 text-gray-400 mb-4" />
        <span className="text-sm text-gray-600">{label}</span>
      </label>
    </div>
  );
}