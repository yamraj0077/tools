import { Route } from '../types/routes';

export const mediaRoutes: Route[] = [
  {
    path: '/media/video-to-mp3',
    title: 'Video to MP3',
    description: 'Extract audio from video files',
  },
  {
    path: '/media/compress-video',
    title: 'Compress Video',
    description: 'Reduce video file size while maintaining quality',
  },
  {
    path: '/media/audio-cutter',
    title: 'Audio Cutter',
    description: 'Trim and cut audio files',
  },
  {
    path: '/media/video-cutter',
    title: 'Video Cutter',
    description: 'Trim and cut video files',
  },
];