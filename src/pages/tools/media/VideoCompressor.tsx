import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { Video, Download } from 'lucide-react';
import { Card } from '../../../components/common/Card';

interface CompressionSettings {
  quality: number;
  resolution: string;
}

export function VideoCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 80,
    resolution: '720p',
  });

  const resolutions = ['360p', '480p', '720p', '1080p'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <ToolLayout
      title="Video Compressor"
      description="Reduce video file size while maintaining quality"
    >
      <div className="space-y-6">
        <FileUpload
          id="video-upload"
          accept="video/*"
          icon={Video}
          label="Drop a video file here or click to upload"
          onChange={handleFileChange}
        />

        {file && (
          <Card className="space-y-4">
            <div>
              <h3 className="font-medium">Selected Video:</h3>
              <p className="text-sm text-gray-600">{file.name}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Quality: {settings.quality}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={settings.quality}
                  onChange={(e) => setSettings({ ...settings, quality: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Resolution
                </label>
                <select
                  value={settings.resolution}
                  onChange={(e) => setSettings({ ...settings, resolution: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {resolutions.map((res) => (
                    <option key={res} value={res}>{res}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button icon={Download}>
              Compress Video
            </Button>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}