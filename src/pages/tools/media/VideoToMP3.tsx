import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { Button } from '../../../components/tools/Button';
import { Video, Music } from 'lucide-react';

export function VideoToMP3() {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  return (
    <ToolLayout
      title="Video to MP3 Converter"
      description="Extract audio from video files in MP3 format"
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => e.target.files && setVideoFile(e.target.files[0])}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Video className="h-12 w-12 text-gray-400 mb-4" />
            <span className="text-sm text-gray-600">
              Drop a video file here or click to upload
            </span>
          </label>
        </div>

        {videoFile && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium">Selected Video:</h3>
              <p className="text-sm text-gray-600">{videoFile.name}</p>
            </div>

            <Button icon={Music}>
              Extract Audio (MP3)
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}