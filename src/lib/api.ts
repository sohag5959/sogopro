import confetti from 'canvas-confetti';
import { MediaMetadata } from './types.js';

export async function fetchMediaInfo(url: string): Promise<MediaMetadata> {
  const response = await fetch('/api/fetch-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch video information. Please verify the URL.');
  }

  return data.data;
}

export async function downloadMediaFile(
  url: string,
  formatId: string,
  title: string,
  quality: string,
  onProgress?: (progress: number) => void,
  downloadUrl?: string
): Promise<string> {
  const jobId = 'job_' + Math.random().toString(36).substring(2, 9);

  // Progressive feedback simulation for smooth user UI feedback
  if (onProgress) {
    onProgress(15);
  }

  const response = await fetch('/api/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      formatId,
      title,
      quality,
      downloadJobId: jobId,
      downloadUrl,
    }),
  });

  if (onProgress) onProgress(45);

  if (!response.ok) {
    let errMessage = 'Download failed.';
    try {
      const errJson = await response.json();
      errMessage = errJson.error || errMessage;
    } catch {
      // ignored
    }
    throw new Error(errMessage);
  }

  if (onProgress) onProgress(75);

  // Read response stream as Blob
  const blob = await response.blob();
  if (onProgress) onProgress(95);

  // Determine filename from Content-Disposition header if available
  const contentDisposition = response.headers.get('Content-Disposition');
  let filename = `sogopro_${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.${formatId.includes('mp3') ? 'mp3' : 'mp4'}`;
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1];
    }
  }

  // Trigger browser download via object URL
  const objectUrl = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  if (onProgress) onProgress(100);

  // Trigger celebration confetti
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#a855f7', '#ec4899'],
    });
  } catch {
    // optional effect
  }

  setTimeout(() => {
    window.URL.revokeObjectURL(objectUrl);
  }, 10000);

  return filename;
}
