export type PlatformKey = 
  | 'youtube' 
  | 'youtube_shorts' 
  | 'instagram' 
  | 'tiktok' 
  | 'twitter' 
  | 'facebook' 
  | 'vimeo' 
  | 'reddit' 
  | 'pinterest' 
  | 'dailymotion' 
  | 'snapchat' 
  | 'linkedin' 
  | 'generic';

export interface MediaFormat {
  id: string;
  type: 'video' | 'audio';
  quality: string;
  resolution?: string;
  extension: 'mp4' | 'mp3' | 'webm';
  fileSize: string;
  hasAudio: boolean;
  noWatermark?: boolean;
  bitrate?: string;
  downloadUrl?: string;
}

export interface MediaMetadata {
  id: string;
  url: string;
  title: string;
  author: string;
  authorUrl?: string;
  thumbnail: string;
  duration: string;
  durationSeconds: number;
  platform: PlatformKey;
  platformName: string;
  formats: MediaFormat[];
  viewsCount?: string;
  publishDate?: string;
}

export interface DownloadHistoryItem {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  author: string;
  platform: PlatformKey;
  platformName: string;
  quality: string;
  extension: string;
  fileSize: string;
  downloadedAt: number; // timestamp
}
