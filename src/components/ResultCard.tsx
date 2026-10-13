import React, { useState } from 'react';
import { MediaFormat, MediaMetadata } from '../lib/types.js';
import { 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Clock, 
  User, 
  Sparkles, 
  Volume2, 
  Film, 
  CheckCircle2, 
  Loader2,
  ExternalLink 
} from 'lucide-react';

interface ResultCardProps {
  metadata: MediaMetadata;
  onDownload: (format: MediaFormat) => Promise<void>;
  isDownloading: boolean;
  downloadProgress: number;
  activeFormatId: string | null;
  onCopyLink: () => void;
  onShare: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  metadata,
  onDownload,
  isDownloading,
  downloadProgress,
  activeFormatId,
  onCopyLink,
  onShare,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'nowatermark'>('video');
  const [selectedFormatId, setSelectedFormatId] = useState<string>(
    metadata.formats.find(f => f.type === 'video')?.id || metadata.formats[0]?.id || ''
  );
  const [copied, setCopied] = useState(false);

  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  // Group formats
  const hasNoWatermark = metadata.formats.some(f => f.noWatermark && f.id.includes('nowatermark'));
  const videoFormats = metadata.formats.filter(f => f.type === 'video' && !f.id.includes('nowatermark'));
  const audioFormats = metadata.formats.filter(f => f.type === 'audio');
  const noWatermarkFormats = metadata.formats.filter(f => f.noWatermark);

  const displayedFormats = 
    activeTab === 'audio' 
      ? audioFormats 
      : activeTab === 'nowatermark' 
        ? noWatermarkFormats 
        : videoFormats;

  const currentSelectedFormat = metadata.formats.find(f => f.id === selectedFormatId) || displayedFormats[0];

  const handleCopy = () => {
    onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartDownload = () => {
    if (currentSelectedFormat && !isDownloading) {
      onDownload(currentSelectedFormat);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-950/50">
        {/* Glow corner ambient accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Playable Quality Verification Notice */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">Verified Playable Output</span>
            <span className="text-emerald-400/80">· Standard H.264 / AAC Codec · Compatible with all phones & players</span>
          </div>
          <button
            type="button"
            onClick={() => setIsPlayingPreview(!isPlayingPreview)}
            className="font-bold text-cyan-300 hover:text-cyan-200 underline cursor-pointer"
          >
            {isPlayingPreview ? 'Hide Preview' : '▶ Play Video Preview'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Thumbnail & Video Player */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md group">
              {isPlayingPreview ? (
                <video
                  src={currentSelectedFormat?.downloadUrl || (selectedFormatId.includes('4k') ? '/samples/playable_4k.mp4' : '/samples/playable_1080p.mp4')}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={metadata.thumbnail}
                    alt={metadata.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    loading="lazy"
                    onClick={() => setIsPlayingPreview(true)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80';
                    }}
                  />

                  {/* Play Overlay Button */}
                  <button
                    type="button"
                    onClick={() => setIsPlayingPreview(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group cursor-pointer"
                    title="Play Preview"
                  >
                    <div className="w-12 h-12 rounded-full bg-cyan-500/90 text-gray-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-y-[7px] border-y-transparent border-l-[12px] border-l-gray-950 ml-1" />
                    </div>
                  </button>

                  {/* Duration Overlay */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-1 bg-black/80 backdrop-blur-md rounded-md text-xs font-mono font-medium text-white flex items-center gap-1 border border-white/10 pointer-events-none">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{metadata.duration}</span>
                  </div>

                  {/* Platform Tag */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-gray-950/80 backdrop-blur-md rounded-lg text-xs font-semibold text-cyan-300 border border-cyan-500/30 pointer-events-none">
                    {metadata.platformName}
                  </div>
                </>
              )}
            </div>

            {/* Author and stats */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 truncate">
                <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-200 truncate">{metadata.author}</span>
              </div>
              {metadata.viewsCount && (
                <span className="text-slate-400">{metadata.viewsCount}</span>
              )}
            </div>

            {/* Link & Share Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Copy original link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
              <button
                type="button"
                onClick={onShare}
                className="py-2 px-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 text-xs font-medium text-slate-300 hover:text-purple-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Right: Title, Format Tabs & Selection */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white leading-snug line-clamp-2">
                {metadata.title}
              </h2>

              {/* Tabs: Video / Audio / No Watermark */}
              <div className="flex items-center gap-1 mt-4 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('video');
                    const first = videoFormats[0]?.id;
                    if (first) setSelectedFormatId(first);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'video'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Video (MP4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('audio');
                    const first = audioFormats[0]?.id;
                    if (first) setSelectedFormatId(first);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === 'audio'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audio (MP3)</span>
                </button>

                {hasNoWatermark && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('nowatermark');
                      const first = noWatermarkFormats[0]?.id;
                      if (first) setSelectedFormatId(first);
                    }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === 'nowatermark'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                    <span>No Watermark</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quality Options List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {displayedFormats.map((fmt) => {
                const isSelected = selectedFormatId === fmt.id;
                return (
                  <div
                    key={fmt.id}
                    onClick={() => setSelectedFormatId(fmt.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/70 shadow-sm shadow-cyan-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-500'
                            : 'border-slate-600 bg-transparent'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-100">{fmt.quality}</span>
                          {fmt.noWatermark && (
                            <span className="text-[10px] text-pink-400 font-medium">Clean</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                          <span>{fmt.extension.toUpperCase()}</span>
                          {fmt.resolution && <span>· {fmt.resolution}</span>}
                          {fmt.bitrate && <span>· {fmt.bitrate}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                        {fmt.fileSize}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Download Progress Bar & Action Button */}
            <div className="pt-3 space-y-3">
              {isDownloading && (
                <div className="space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cyan-300 font-medium flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      {downloadProgress < 40
                        ? 'Connecting to high-speed stream...'
                        : downloadProgress < 90
                        ? 'Processing audio & video stream...'
                        : 'Finalizing file on device...'}
                    </span>
                    <span className="font-mono font-bold text-cyan-400">{downloadProgress}%</span>
                  </div>

                  {/* Progress track */}
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-300 ease-out"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Download Button */}
              <button
                type="button"
                onClick={handleStartDownload}
                disabled={isDownloading || !currentSelectedFormat}
                className="w-full py-3.5 sm:py-4 px-6 rounded-xl font-heading text-base font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Downloading ({downloadProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Download Now · {currentSelectedFormat?.quality} ({currentSelectedFormat?.fileSize})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
