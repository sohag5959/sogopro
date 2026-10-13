import { DownloadHistoryItem } from './types.js';

const STORAGE_KEY = 'sogopro_recent_downloads_v1';
const MAX_HISTORY_ITEMS = 10;

export function getDownloadHistory(): DownloadHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items = JSON.parse(raw);
    return Array.isArray(items) ? items : [];
  } catch (e) {
    console.error('Failed to parse download history from localStorage:', e);
    return [];
  }
}

export function saveDownloadToHistory(item: DownloadHistoryItem): DownloadHistoryItem[] {
  try {
    const current = getDownloadHistory();
    // Prepend new item, remove any duplicate with same url & format
    const filtered = current.filter(
      (existing) => !(existing.url === item.url && existing.quality === item.quality)
    );
    const updated = [item, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save to download history:', e);
    return [];
  }
}

export function removeHistoryItem(id: string): DownloadHistoryItem[] {
  try {
    const current = getDownloadHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove history item:', e);
    return [];
  }
}

export function clearDownloadHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear download history:', e);
  }
}
