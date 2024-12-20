import React, { useState, useCallback, useEffect } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Card } from '../../../components/common/Card';
import { Tabs } from '../../../components/common/Tabs';
import { Image } from 'lucide-react';
import { Canvas } from '../../../components/image-editor/Canvas';
import { EditorControls } from '../../../components/image-editor/EditorControls';
import { AdjustmentsPanel } from '../../../components/image-editor/AdjustmentsPanel';
import { LayoutPanel } from '../../../components/image-editor/LayoutPanel';
import { TemplatesPanel } from '../../../components/image-editor/TemplatesPanel';
import { useImageEditor } from '../../../hooks/useImageEditor';
import { downloadCanvas, copyCanvasToClipboard } from '../../../utils/image-editor/export';
import { loadImage } from '../../../utils/image/loader';
import { getDimensionsForRatio } from '../../../utils/image-editor/dimensions';
import {
  ImageDimensions,
  AspectRatioPreset,
  TemplateCategory,
  EditorTab
} from '../../../types/image-editor';

export function ImageEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<ImageDimensions>({ width: 800, height: 600 });
  const [aspectRatio, setAspectRatio] = useState<AspectRatioPreset>('custom');
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [activeTab, setActiveTab] = useState<EditorTab>('adjust');
  const [templateCategory, setTemplateCategory] = useState<TemplateCategory>('social');
  const [currentCanvas, setCurrentCanvas] = useState<HTMLCanvasElement | null>(null);
  
  const {
    adjustments,
    handleAdjustmentChange,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo
  } = useImageEditor();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        const img = await loadImage(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        setImage(url);
        setDimensions({
          width: img.width,
          height: img.height
        });
        setAspectRatio('custom');
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    }
  };

  const handleAspectRatioChange = (ratio: AspectRatioPreset) => {
    setAspectRatio(ratio);
    if (ratio !== 'custom') {
      const newDimensions = getDimensionsForRatio(dimensions, ratio);
      setDimensions(newDimensions);
    }
  };

  const handleTemplateSelect = (newDimensions: ImageDimensions, ratio: AspectRatioPreset) => {
    setDimensions(newDimensions);
    setAspectRatio(ratio);
  };

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    setCurrentCanvas(canvas);
  }, []);

  const handleDownload = () => {
    if (currentCanvas) {
      downloadCanvas(currentCanvas);
    }
  };

  const handleCopy = async () => {
    if (currentCanvas) {
      await copyCanvasToClipboard(currentCanvas);
    }
  };

  // Cleanup image URL on unmount
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <ToolLayout
      title="Image Editor"
      description="Edit and enhance your images with professional tools"
    >
      <div className="space-y-6">
        {!image ? (
          <FileUpload
            id="image-upload"
            accept="image/*"
            icon={Image}
            label="Drop an image here or click to upload"
            onChange={handleFileChange}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-4 h-full">
                <div className="h-full flex flex-col">
                  <Canvas
                    image={image}
                    adjustments={adjustments}
                    dimensions={dimensions}
                    onCanvasReady={handleCanvasReady}
                  />
                  <EditorControls
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    onDownload={handleDownload}
                    onCopy={handleCopy}
                    canUndo={canUndo}
                    canRedo={canRedo}
                  />
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <Tabs
                tabs={[
                  { id: 'adjust', label: 'Adjust' },
                  { id: 'layout', label: 'Layout' },
                  { id: 'templates', label: 'Templates' }
                ]}
                activeTab={activeTab}
                onChange={(id) => setActiveTab(id as EditorTab)}
              />

              <Card className="p-4">
                {activeTab === 'adjust' && (
                  <AdjustmentsPanel
                    adjustments={adjustments}
                    onAdjustmentChange={handleAdjustmentChange}
                  />
                )}

                {activeTab === 'layout' && (
                  <LayoutPanel
                    dimensions={dimensions}
                    aspectRatio={aspectRatio}
                    onDimensionsChange={setDimensions}
                    onAspectRatioChange={handleAspectRatioChange}
                    maintainRatio={maintainRatio}
                    onMaintainRatioChange={setMaintainRatio}
                  />
                )}

                {activeTab === 'templates' && (
                  <TemplatesPanel
                    category={templateCategory}
                    onCategoryChange={setTemplateCategory}
                    onTemplateSelect={handleTemplateSelect}
                  />
                )}
              </Card>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}