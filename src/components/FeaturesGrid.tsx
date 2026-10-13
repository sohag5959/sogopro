import React from 'react';
import { Zap, Tv, EyeOff, Globe2, ShieldCheck, Sparkles, HardDrive, Smartphone } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      title: 'High Speed Acceleration',
      description: 'Distributed cloud streaming engine delivers rapid conversions and direct downloads without queued waiting times or throttled bandwidth.',
      icon: Zap,
      accent: 'from-cyan-500 to-blue-500',
      tag: 'Turbo Stream',
    },
    {
      title: 'HD & 4K Studio Quality',
      description: 'Download media in full original fidelity up to 4K Ultra HD (2160p), 1080p 60fps, and studio-grade 320kbps MP3 audio.',
      icon: Tv,
      accent: 'from-blue-500 to-indigo-500',
      tag: 'Lossless Audio/Video',
    },
    {
      title: 'Zero Watermark',
      description: 'Clean extraction removes platform watermarks, logos, and user overlays from TikTok videos, Instagram Reels, and YouTube Shorts.',
      icon: EyeOff,
      accent: 'from-purple-500 to-pink-500',
      tag: 'Pristine Media',
    },
    {
      title: 'All Platforms Supported',
      description: 'Universal compatibility covering YouTube, TikTok, Instagram, Twitter/X, Facebook, Vimeo, Reddit, Pinterest, Dailymotion, and more.',
      icon: Globe2,
      accent: 'from-pink-500 to-rose-500',
      tag: 'Universal Web',
    },
  ];

  return (
    <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
          Why Choose Sogopro
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Engineered for{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Speed, Fidelity, & Privacy
          </span>
        </h2>
        <p className="text-slate-400 mt-4 text-base sm:text-lg">
          The ultimate personal media tool designed with modern cyberpunk aesthetics and uncompromised performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 sm:p-7 relative flex flex-col justify-between group hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.accent} p-[1.5px] mb-5 shadow-lg shadow-cyan-500/10 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  {feature.tag}
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2.5">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-400">100% Free Forever</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
