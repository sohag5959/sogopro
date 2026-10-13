import React from 'react';
import { ClipboardCopy, SlidersHorizontal, DownloadCloud, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Paste Video Link',
      description: 'Copy the URL from YouTube, Instagram, TikTok, Facebook, or any supported social media platform and paste it into the search box.',
      icon: ClipboardCopy,
      color: 'from-cyan-500 to-blue-500',
      badge: 'Step 1',
    },
    {
      step: '02',
      title: 'Choose Quality & Format',
      description: 'Select your preferred video resolution (4K Ultra HD, 1080p, 720p) or studio MP3 audio (320kbps), with clean watermark-free options.',
      icon: SlidersHorizontal,
      color: 'from-blue-500 to-purple-500',
      badge: 'Step 2',
    },
    {
      step: '03',
      title: 'Instant Download',
      description: 'Click "Download Now" and the media file will immediately start downloading to your phone, tablet, or PC with zero waiting queues.',
      icon: DownloadCloud,
      color: 'from-purple-500 to-pink-500',
      badge: 'Step 3',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
          Seamless Workflow
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          How It Works in{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            3 Simple Steps
          </span>
        </h2>
        <p className="text-slate-400 mt-4 text-base sm:text-lg">
          No complicated setups, no account registration, and zero ads. Download high-definition media in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="glass-card rounded-2xl sm:rounded-3xl p-8 relative flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300 shadow-lg shadow-black/40"
            >
              {/* Step Number Background Ghost */}
              <div className="absolute top-6 right-6 font-heading font-black text-6xl text-slate-800/40 select-none group-hover:text-cyan-500/10 transition-colors">
                {item.step}
              </div>

              <div>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} p-[1.5px] mb-6 shadow-md shadow-cyan-500/10 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                  {item.badge}
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Lightning-fast processing</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
