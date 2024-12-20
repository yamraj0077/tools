import React from 'react';
import { Tool } from '../types/tools';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  onToolClick: (tool: Tool) => void;
}

export function ToolGrid({ tools, onToolClick }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard
          key={tool.title}
          title={tool.title}
          description={tool.description}
          icon={tool.icon}
          onClick={() => onToolClick(tool)}
        />
      ))}
    </div>
  );
}