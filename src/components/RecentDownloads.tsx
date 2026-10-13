import React from 'react';
import { DownloadHistoryItem } from '../lib/types.js';
import { Download, Trash2, Clock, ExternalLink, RefreshCw, Film } from 'lucide-react';

interface RecentDownloadsProps {
  history: DownloadHistoryItem[];
  onSelectUrl: (url: string) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const RecentDownloads: React.FC<RecentDownloadsProps> = ({
  history,
  onSelectUrl,
  onDeleteItem,
  onClearAll,
}) => {
  if (history.length === 0) {
    return null; // Keep clean if no downloads yet
  }

  const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(ts).toLocaleDateString();
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
            Local Device History
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Recent Downloads
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Stored locally on your device for quick access and redownloads.
          </p>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:border-rose-900/50 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl p-4 flex gap-3.5 items-center justify-between group hover:border-cyan-500/40 transition-all duration-200"
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>
              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
                <span className="text-cyan-400 font-medium">{item.quality}</span>
                <span>·</span>
                <span>{item.fileSize}</span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                <span>{formatTime(item.downloadedAt)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onSelectUrl(item.url)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-950/80 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
                title="Fetch again"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteItem(item.id)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950/80 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/40 transition-colors cursor-pointer"
                title="Remove from history"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
