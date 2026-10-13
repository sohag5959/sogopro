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
  quality: string;       // e.g. "4K (2160p)", "1080p Full HD", "720p HD", "480p SD", "320kbps MP3", "128kbps MP3"
  resolution?: string;   // e.g. "3840x2160", "1920x1080"
  extension: 'mp4' | 'mp3' | 'webm';
  fileSize: string;      // e.g. "145.2 MB", "4.8 MB"
  hasAudio: boolean;
  noWatermark?: boolean;
  bitrate?: string;
  downloadUrl?: string;  // Direct stream url if resolved
}

export interface MediaMetadata {
  id: string;
  url: string;
  title: string;
  author: string;
  authorUrl?: string;
  thumbnail: string;
  duration: string;      // formatted string, e.g. "03:45"
  durationSeconds: number;
  platform: PlatformKey;
  platformName: string;
  formats: MediaFormat[];
  viewsCount?: string;
  publishDate?: string;
}

export interface FetchInfoRequest {
  url: string;
}

export interface FetchInfoResponse {
  success: boolean;
  data?: MediaMetadata;
  error?: string;
}

export interface DownloadRequest {
  url: string;
  formatId: string;
  quality?: string;
  title?: string;
  downloadJobId?: string;
}
