import { useState } from 'react';
import { ImageAdjustments } from '../types/image-editor';

const DEFAULT_ADJUSTMENTS: ImageAdjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  opacity: 100
};

export function useImageEditor() {
  const [adjustments, setAdjustments] = useState<ImageAdjustments>(DEFAULT_ADJUSTMENTS);
  const [history, setHistory] = useState<ImageAdjustments[]>([DEFAULT_ADJUSTMENTS]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAdjustmentChange = (key: keyof ImageAdjustments, value: number) => {
    const newAdjustments = { ...adjustments, [key]: value };
    
    // Remove any future history after current index
    const newHistory = history.slice(0, currentIndex + 1);
    
    // Add new state to history
    newHistory.push(newAdjustments);
    
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setAdjustments(newAdjustments);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setAdjustments(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setAdjustments(history[newIndex]);
    }
  };

  return {
    adjustments,
    handleAdjustmentChange,
    handleUndo,
    handleRedo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1
  };
}