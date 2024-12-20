import React from 'react';
import { Button } from '../tools/Button';
import { Undo, Redo, Download, Copy } from 'lucide-react';

interface EditorControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  onDownload: () => void;
  onCopy: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function EditorControls({
  onUndo,
  onRedo,
  onDownload,
  onCopy,
  canUndo,
  canRedo
}: EditorControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t">
      <div className="flex gap-2">
        <Button
          onClick={onUndo}
          icon={Undo}
          variant="secondary"
          disabled={!canUndo}
          className="transition-opacity hover:opacity-90 active:opacity-75"
        >
          Undo
        </Button>
        <Button
          onClick={onRedo}
          icon={Redo}
          variant="secondary"
          disabled={!canRedo}
          className="transition-opacity hover:opacity-90 active:opacity-75"
        >
          Redo
        </Button>
      </div>
      <div className="flex gap-2 ml-auto">
        <Button 
          onClick={onDownload} 
          icon={Download}
          className="transition-opacity hover:opacity-90 active:opacity-75"
        >
          Download
        </Button>
        <Button 
          onClick={onCopy} 
          icon={Copy} 
          variant="secondary"
          className="transition-opacity hover:opacity-90 active:opacity-75"
        >
          Copy
        </Button>
      </div>
    </div>
  );
}