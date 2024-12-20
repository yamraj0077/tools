import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export default function ToolCard({ title, description, icon: Icon, onClick }: ToolCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 cursor-pointer border border-gray-100 hover:border-indigo-100 hover:scale-105"
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <h3 className="ml-3 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}