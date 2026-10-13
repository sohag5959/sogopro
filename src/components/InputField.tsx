import React, { useState } from 'react';
import { Clipboard, X, ArrowRight, Loader2, Sparkles, Link as LinkIcon } from 'lucide-react';
import { SAMPLE_URLS } from '../lib/constants.js';

interface InputFieldProps {
  url: string;
  onChangeUrl: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onClear: () => void;
  error?: string | null;
}

export const InputField: React.FC<InputFieldProps> = ({
  url,
  onChangeUrl,
  onSubmit,
  isLoading,
  onClear,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChangeUrl(text.trim());
      }
    } catch {
      // Fallback if clipboard permissions blocked
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      {/* Glow Container Wrapper */}
      <div 
        className={`relative rounded-2xl p-[2px] transition-all duration-300 ${
          isFocused 
            ? 'glow-active bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500' 
            : 'bg-gradient-to-r from-slate-800 via-slate-700/60 to-slate-800 hover:from-cyan-500/50 hover:to-purple-500/50'
        }`}
      >
        <div className="relative flex flex-col sm:flex-row items-center bg-gray-950/90 rounded-[14px] p-2 sm:p-2.5 backdrop-blur-xl border border-white/5">
          {/* URL Icon */}
          <div className="hidden sm:flex items-center pl-3 pr-2 text-cyan-400">
            <LinkIcon className="w-5 h-5 opacity-80" />
          </div>

          {/* Text Input */}
          <input
            type="url"
            value={url}
            onChange={(e) => onChangeUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Paste video or audio link here (e.g. YouTube, TikTok, Instagram, X...)"
            disabled={isLoading}
            className="w-full bg-transparent px-3 py-3 sm:py-2.5 text-base sm:text-lg text-slate-100 placeholder:text-slate-500 focus:outline-none font-sans"
            aria-label="Video URL input"
          />

          {/* Action buttons inside bar */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
            {/* Clear Button */}
            {url && (
              <button
                type="button"
                onClick={onClear}
                disabled={isLoading}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer"
                title="Clear input"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Paste Button */}
            <button
              type="button"
              onClick={handlePaste}
              disabled={isLoading}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Paste</span>
            </button>

            {/* Fetch / Download Button */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading || !url.trim()}
              className="px-5 py-2.5 sm:py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <span>Download</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-950/40 border border-rose-900/50 rounded-xl px-4 py-2.5 backdrop-blur-md animate-in fade-in slide-in-from-top-1">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
          <span>{error}</span>
        </div>
      )}

      {/* Sample Link Quick Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-400">
        <span className="flex items-center gap-1 text-slate-400 font-medium">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Try sample:
        </span>
        {SAMPLE_URLS.slice(0, 4).map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onChangeUrl(sample.url)}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all cursor-pointer"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
};
