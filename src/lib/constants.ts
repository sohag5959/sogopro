import { PlatformKey } from './types.js';

export interface PlatformConfig {
  key: PlatformKey;
  name: string;
  tag: string;
  iconName: string;
  gradient: string;
  color: string;
}

export const SUPPORTED_PLATFORMS: PlatformConfig[] = [
  { key: 'youtube', name: 'YouTube', tag: 'Videos', iconName: 'Youtube', gradient: 'from-red-500 to-rose-600', color: '#FF0000' },
  { key: 'youtube_shorts', name: 'YouTube Shorts', tag: 'Shorts', iconName: 'Flame', gradient: 'from-red-600 to-orange-500', color: '#FF3333' },
  { key: 'instagram', name: 'Instagram', tag: 'Reels & Posts', iconName: 'Instagram', gradient: 'from-pink-500 via-purple-500 to-amber-500', color: '#E1306C' },
  { key: 'tiktok', name: 'TikTok', tag: 'No Watermark', iconName: 'Music2', gradient: 'from-cyan-400 to-pink-500', color: '#00F2FE' },
  { key: 'twitter', name: 'Twitter / X', tag: 'Clips & GIFs', iconName: 'Twitter', gradient: 'from-blue-400 to-sky-500', color: '#1DA1F2' },
  { key: 'facebook', name: 'Facebook', tag: 'Watch & Reels', iconName: 'Facebook', gradient: 'from-blue-600 to-indigo-600', color: '#1877F2' },
  { key: 'vimeo', name: 'Vimeo', tag: 'HD Video', iconName: 'Video', gradient: 'from-sky-400 to-blue-500', color: '#1AB7EA' },
  { key: 'reddit', name: 'Reddit', tag: 'Media Posts', iconName: 'MessageSquare', gradient: 'from-orange-500 to-red-600', color: '#FF4500' },
  { key: 'pinterest', name: 'Pinterest', tag: 'Video Pins', iconName: 'Pin', gradient: 'from-rose-600 to-red-700', color: '#BD081C' },
  { key: 'dailymotion', name: 'Dailymotion', tag: 'Streams', iconName: 'PlaySquare', gradient: 'from-blue-500 to-cyan-600', color: '#0066DC' },
  { key: 'snapchat', name: 'Snapchat', tag: 'Spotlight', iconName: 'Ghost', gradient: 'from-yellow-400 to-amber-500', color: '#FFFC00' },
  { key: 'linkedin', name: 'LinkedIn', tag: 'Post Videos', iconName: 'Linkedin', gradient: 'from-blue-600 to-cyan-700', color: '#0A66C2' },
];

export const SAMPLE_URLS = [
  { label: 'YouTube Video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { label: 'YouTube Shorts', url: 'https://www.youtube.com/shorts/507d_Z43W8I' },
  { label: 'TikTok Video', url: 'https://www.tiktok.com/@scout2015/video/6718335390845095173' },
  { label: 'Instagram Reel', url: 'https://www.instagram.com/reel/C57r81mLSgN/' },
  { label: 'Twitter / X Clip', url: 'https://twitter.com/NASA/status/1780283726482938174' },
];

export const FAQ_ITEMS = [
  {
    q: 'Is Sogopro completely free to use?',
    a: 'Yes, 100% free! Sogopro does not require any subscriptions, credit cards, or hidden account registrations. You can extract and download as many personal videos and audio tracks as you need.',
  },
  {
    q: 'Can I download TikTok and Instagram videos without watermark?',
    a: 'Absolutely. For platforms like TikTok and Instagram Reels, Sogopro automatically provides a dedicated "No Watermark" clean format option, allowing you to preserve the original visual clarity.',
  },
  {
    q: 'What video and audio resolutions are supported?',
    a: 'We support MP4 formats in 4K Ultra HD (2160p), 1080p Full HD, 720p HD, and 480p SD, as well as MP3 audio extraction at 320kbps (studio bitrate) and 128kbps (standard bitrate).',
  },
  {
    q: 'Where do downloaded videos get saved on my device?',
    a: 'Videos and MP3 audio files are saved directly into your device’s default Downloads folder (or Photos/Files app on iOS and Android).',
  },
  {
    q: 'Is Sogopro legal and safe to use?',
    a: 'Sogopro is designed strictly for downloading public domain, open-source, or your own personal media content for offline archiving. Downloading copyrighted material without permission from the creator violates our terms of service.',
  },
  {
    q: 'Does Sogopro work on mobile phones and tablets?',
    a: 'Yes! Sogopro is fully responsive and supports Progressive Web App (PWA) installation. You can tap "Install App" or "Add to Home Screen" on your mobile browser for a native app experience.',
  },
];
