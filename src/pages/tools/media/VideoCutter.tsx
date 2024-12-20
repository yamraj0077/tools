import React, { useState, useRef } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { Video, Scissors, Play, Pause } from 'lucide-react';
import { Card } from '../../../components/common/Card';

interface TimeRange {
  start: number;
  end: number;
}

export function VideoCutter() {
  const [video, setVideo] = useState<File | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>({ start: 0, end: 0 });
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setVideo(e.target.files[0]);
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(e.target.files[0]);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <ToolLayout
      title="Video Cutter"
      description="Trim and cut video files with precision"
    >
      <div className="space-y-6">
        <FileUpload
          id="video-upload"
          accept="video/*"
          icon={Video}
          label="Drop a video file here or click to upload"
          onChange={handleFileChange}
        />

        {video && (
          <Card className="space-y-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setTimeRange({ start: 0, end: videoRef.current.duration });
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={togglePlayPause}
                icon={isPlaying ? Pause : Play}
                variant="secondary"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <span className="text-sm text-gray-600">
                {formatTime(currentTime)} / {formatTime(timeRange.end)}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time: {formatTime(timeRange.start)}
                </label>
                <input
                  type="range"
                  min="0"
                  max={timeRange.end}
                  value={timeRange.start}
                  onChange={(e) => setTimeRange({ ...timeRange, start: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time: {formatTime(timeRange.end)}
                </label>
                <input
                  type="range"
                  min={timeRange.start}
                  max={videoRef.current?.duration || 0}
                  value={timeRange.end}
                  onChange={(e) => setTimeRange({ ...timeRange, end: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            <Button icon={Scissors}>
              Cut Video
            </Button>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}