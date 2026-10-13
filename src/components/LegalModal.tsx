import React from 'react';
import { X, ShieldCheck, Scale } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-gray-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            ) : (
              <Scale className="w-5 h-5 text-purple-400" />
            )}
            <h3 className="font-heading text-lg font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service & Fair Use'}
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
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
          {type === 'privacy' ? (
            <>
              <p className="text-slate-200 font-semibold">Effective Date: October 2026</p>
              <p>
                At Sogopro (<strong>sogopro.com</strong>), your privacy is our top priority. We operate on a strict zero-telemetry, zero-log principle:
              </p>
              <h4 className="text-white font-bold pt-2">1. No Personal Data Collection</h4>
              <p>
                We do not require user accounts, email addresses, phone numbers, or credit card info. We never track your personal identity.
              </p>
              <h4 className="text-white font-bold pt-2">2. Local Processing & Storage</h4>
              <p>
                Your recent download history is stored solely in your local browser’s localStorage. You can clear this anytime with the &quot;Clear History&quot; button. None of your downloaded filenames or URLs are permanently stored on our servers.
              </p>
              <h4 className="text-white font-bold pt-2">3. No Third-Party Tracking Cookies</h4>
              <p>
                We do not sell user data, nor do we run aggressive cross-site ad networks or invasive tracking pixels.
              </p>
            </>
          ) : (
            <>
              <p className="text-slate-200 font-semibold">Terms of Service · Fair Use Agreement</p>
              <h4 className="text-white font-bold pt-2">1. Permitted Purpose</h4>
              <p>
                Sogopro is provided solely as a personal utility for downloading and archiving audio and video files that you own, have created, or have explicit legal authorization/creative commons license to store.
              </p>
              <h4 className="text-white font-bold pt-2">2. Prohibition on Copyright Infringement</h4>
              <p>
                You must not use Sogopro to infringe on third-party intellectual property or copy commercial copyrighted works without permission. Users bear full responsibility for their compliance with local laws and host platform terms.
              </p>
              <h4 className="text-white font-bold pt-2">3. Disclaimer of Warranty</h4>
              <p>
                The service is provided &quot;as is&quot; without warranties of any kind. Sogopro is an independent web application and is not affiliated, endorsed, or partnered with YouTube, Meta, TikTok, X Corp, or any platform mentioned.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
