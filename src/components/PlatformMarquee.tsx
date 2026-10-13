import React from 'react';
import { SUPPORTED_PLATFORMS } from '../lib/constants.js';
import { Sparkles } from 'lucide-react';

export const PlatformMarquee: React.FC = () => {
  // Duplicate for seamless infinite loop
  const marqueeItems = [...SUPPORTED_PLATFORMS, ...SUPPORTED_PLATFORMS];

  return (
    <section className="py-8 sm:py-12 border-y border-slate-900 bg-slate-950/40 overflow-hidden relative">
      {/* Edge Gradients for soft fading */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold flex items-center justify-center gap-2">
          <span>Supported Everywhere</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-cyan-400">100+ Platforms & Formats</span>
        </div>
      </div>

      {/* Marquee Track */}
      <div className="flex animate-marquee items-center gap-4 py-2">
        {marqueeItems.map((item, idx) => (
          <div
            key={`${item.key}-${idx}`}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-200 shrink-0 group select-none shadow-sm"
          >
            <div 
              className="w-2.5 h-2.5 rounded-full shrink-0 group-hover:scale-125 transition-transform"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
              {item.name}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              · {item.tag}
            </span>
          </div>
        ))}

        {/* And Many More Badge */}
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/30 shrink-0 select-none">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span className="text-sm font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            + and many more
          </span>
        </div>
      </div>
    </section>
  );
};
