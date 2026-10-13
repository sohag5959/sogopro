import React, { useState, useEffect } from 'react';
import { Download, Sun, Moon, Sparkles, Menu, X, Smartphone, ArrowDown } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenContact: () => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenContact,
  onOpenDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-cyan-500/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="/" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
            <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              {/* Lightning + Arrow hybrid icon */}
              <svg className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L4 13H11L9 22L20 9H13L13 2Z" fill="url(#navLogoGrad)" />
                <path d="M12 14V21M9 18L12 21L15 18" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="navLogoGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06b6d4" />
                    <stop offset="0.5" stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-heading text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300 transition-all">
              Sogopro
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium -mt-1 hidden sm:block">
              Media Downloader
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button 
            onClick={() => scrollTo('features')}
            className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            Features
          </button>
          <button 
            onClick={() => scrollTo('how-it-works')}
            className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollTo('faq')}
            className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            FAQ
          </button>
          <button 
            onClick={onOpenContact}
            className="text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            Contact
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Walkthrough Button */}
          <button
            onClick={onOpenDemo}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/60 transition-all duration-200 cursor-pointer"
            title="Try with sample links"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sample Links</span>
          </button>

          {/* PWA Install Button (shows if available) */}
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/40 hover:bg-purple-600/30 transition-all cursor-pointer"
              title="Install Sogopro App"
            >
              <Smartphone className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
            aria-label="Toggle dark/light mode"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-gray-950/95 backdrop-blur-xl px-4 py-5 space-y-4">
          <div className="grid grid-cols-1 gap-2 text-base font-medium">
            <button
              onClick={() => scrollTo('features')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-cyan-400"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-cyan-400"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-cyan-400"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-cyan-400"
            >
              Contact Support
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="text-left py-2 px-3 rounded-lg bg-cyan-950/50 text-cyan-300 border border-cyan-500/20"
            >
              Try Sample Video Links
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
