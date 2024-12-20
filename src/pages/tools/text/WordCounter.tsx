import React, { useState, useMemo } from 'react';
import { TextArea } from '../../../components/tools/TextArea';
import { ToolLayout } from '../../../components/tools/ToolLayout';

export function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    const lines = text.split('\n').length;

    return { words, characters, charactersNoSpaces, paragraphs, lines };
  }, [text]);

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, paragraphs, and lines in your text"
    >
      <div className="space-y-6">
        <TextArea
          value={text}
          onChange={setText}
          placeholder="Type or paste your text here..."
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="Words" value={stats.words} />
          <StatCard label="Characters" value={stats.characters} />
          <StatCard label="Characters (no spaces)" value={stats.charactersNoSpaces} />
          <StatCard label="Paragraphs" value={stats.paragraphs} />
          <StatCard label="Lines" value={stats.lines} />
        </div>
      </div>
    </ToolLayout>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}