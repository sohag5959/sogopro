import React from 'react';
import { InputField } from './InputField.js';
import { Sparkles, Zap, ShieldCheck, Download } from 'lucide-react';

interface HeroSectionProps {
  url: string;
  onChangeUrl: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onClear: () => void;
  error?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  url,
  onChangeUrl,
  onSubmit,
  isLoading,
  onClear,
  error,
}) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      {/* Animated Aurora Background Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-blue-600/15 to-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-blob-1" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none -z-10 animate-blob-2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Brand Tagline Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-sm">
          <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Sogopro · Download Anything · Anywhere · Fast · Free · HD</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
          Download Any Video,{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Anywhere.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 font-normal leading-relaxed">
          Fast, Free, and High Quality. Extract ultra-crisp 4K, 1080p MP4 videos and 320kbps MP3 audio with no watermarks from your favorite platforms.
        </p>

        {/* Hero Input Field */}
        <div className="relative z-10 mb-8">
          <InputField
            url={url}
            onChangeUrl={onChangeUrl}
            onSubmit={onSubmit}
            isLoading={isLoading}
            onClear={onClear}
            error={error}
          />
        </div>

        {/* Trust & Performance Markers */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400 pt-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Instant Parallel Conversion</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Watermark & No Adware</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Up to 4K Ultra HD & 320k Audio</span>
          </div>
        </div>
      </div>
    </section>
  );
};
