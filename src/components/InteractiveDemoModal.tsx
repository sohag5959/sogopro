import React from 'react';
import { X, Play, Sparkles, Film, ArrowRight } from 'lucide-react';
import { SAMPLE_URLS } from '../lib/constants.js';

interface InteractiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (url: string) => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-gray-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-heading text-lg font-bold text-white">
              Instant Sample Test Links
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-300">
            Pick any verified media URL below to immediately test Sogopro&apos;s metadata extraction, quality formats, and download engine:
          </p>

          <div className="space-y-2.5">
            {SAMPLE_URLS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectSample(item.url);
                  onClose();
                }}
                className="w-full p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 truncate pr-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Film className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500 truncate font-mono">
                      {item.url}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-cyan-400 font-bold shrink-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <span>Load</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <span>💡 You can also paste any link directly from TikTok, Instagram, Twitter, Facebook, or Reddit!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
