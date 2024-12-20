import React, { useState } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { Music, Scissors } from 'lucide-react';

interface TimeRange {
  start: string;
  end: string;
}

export function AudioTrimmer() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>({ start: '0:00', end: '0:00' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  return (
    <ToolLayout
      title="Audio Trimmer"
      description="Trim and cut audio files with precision"
    >
      <div className="space-y-6">
        <FileUpload
          id="audio-upload"
          accept="audio/*"
          icon={Music}
          label="Drop an audio file here or click to upload"
          onChange={handleFileChange}
        />

        {audioFile && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium">Selected Audio:</h3>
              <p className="text-sm text-gray-600">{audioFile.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time (mm:ss)
                </label>
                <input
                  type="text"
                  value={timeRange.start}
                  onChange={(e) => setTimeRange({ ...timeRange, start: e.target.value })}
                  placeholder="0:00"
                  pattern="[0-9]+:[0-5][0-9]"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time (mm:ss)
                </label>
                <input
                  type="text"
                  value={timeRange.end}
                  onChange={(e) => setTimeRange({ ...timeRange, end: e.target.value })}
                  placeholder="0:00"
                  pattern="[0-9]+:[0-5][0-9]"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

            <Button icon={Scissors}>
              Trim Audio
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}