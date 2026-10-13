import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar.js';
import { HeroSection } from './components/HeroSection.js';
import { ResultCard } from './components/ResultCard.js';
import { PlatformMarquee } from './components/PlatformMarquee.js';
import { HowItWorks } from './components/HowItWorks.js';
import { FeaturesGrid } from './components/FeaturesGrid.js';
import { RecentDownloads } from './components/RecentDownloads.js';
import { FAQSection } from './components/FAQSection.js';
import { Footer } from './components/Footer.js';
import { LegalModal } from './components/LegalModal.js';
import { ContactModal } from './components/ContactModal.js';
import { InteractiveDemoModal } from './components/InteractiveDemoModal.js';
import { Toast } from './components/Toast.js';
import { MediaFormat, MediaMetadata, DownloadHistoryItem } from './lib/types.js';
import { fetchMediaInfo, downloadMediaFile } from './lib/api.js';
import {
  getDownloadHistory,
  saveDownloadToHistory,
  removeHistoryItem,
  clearDownloadHistory,
} from './lib/storage.js';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(true);

  // Core App states
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);

  // Download states
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [activeFormatId, setActiveFormatId] = useState<string | null>(null);

  // History state
  const [history, setHistory] = useState<DownloadHistoryItem[]>([]);

  // Modals state
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string | null; type: 'success' | 'error' | 'info' }>({
    message: null,
    type: 'success',
  });

  const resultRef = useRef<HTMLDivElement>(null);

  // Initialize theme, history, and PWA service worker
  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem('sogopro_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    // History setup
    setHistory(getDownloadHistory());

    // Register service worker if supported
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('Service Worker registration skipped:', err);
      });
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('sogopro_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('sogopro_theme', 'light');
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const handleFetchInfo = async (targetUrl?: string) => {
    const queryUrl = (targetUrl || url).trim();
    if (!queryUrl) {
      setError('Please paste a video or audio link to download.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const data = await fetchMediaInfo(queryUrl);
      setMetadata(data);
      // Smooth scroll down to result card
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unable to fetch video information. Please ensure the URL is valid.');
      showToast(err.message || 'Error fetching video metadata', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: MediaFormat) => {
    if (!metadata) return;

    setIsDownloading(true);
    setActiveFormatId(format.id);
    setDownloadProgress(10);

    try {
      const savedFilename = await downloadMediaFile(
        metadata.url,
        format.id,
        metadata.title,
        format.quality,
        (progress) => {
          setDownloadProgress(progress);
        },
        format.downloadUrl
      );

      // Save to local device history
      const historyItem: DownloadHistoryItem = {
        id: 'hist_' + Date.now(),
        url: metadata.url,
        title: metadata.title,
        thumbnail: metadata.thumbnail,
        author: metadata.author,
        platform: metadata.platform,
        platformName: metadata.platformName,
        quality: format.quality,
        extension: format.extension,
        fileSize: format.fileSize,
        downloadedAt: Date.now(),
      };

      const updatedHistory = saveDownloadToHistory(historyItem);
      setHistory(updatedHistory);

      showToast(`Downloaded "${savedFilename}" successfully!`, 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to download file.', 'error');
    } finally {
      setIsDownloading(false);
      setActiveFormatId(null);
      setDownloadProgress(0);
    }
  };

  const handleSelectSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    handleFetchInfo(sampleUrl);
  };

  const handleCopyLink = () => {
    if (!metadata) return;
    navigator.clipboard.writeText(metadata.url);
    showToast('Link copied to clipboard!');
  };

  const handleShare = async () => {
    if (!metadata) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: metadata.title,
          text: `Download "${metadata.title}" on Sogopro!`,
          url: metadata.url,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = removeHistoryItem(id);
    setHistory(updated);
    showToast('Item removed from local history');
  };

  const handleClearHistory = () => {
    clearDownloadHistory();
    setHistory([]);
    showToast('Download history cleared');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-gray-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Navigation */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenContact={() => setContactModalOpen(true)}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Glowing Input */}
        <HeroSection
          url={url}
          onChangeUrl={(val) => {
            setUrl(val);
            if (error) setError(null);
          }}
          onSubmit={() => handleFetchInfo()}
          isLoading={isLoading}
          onClear={() => {
            setUrl('');
            setError(null);
          }}
          error={error}
        />

        {/* Dynamic Result Card (Shows when metadata is loaded) */}
        <div ref={resultRef}>
          {metadata && (
            <div className="px-4">
              <ResultCard
                metadata={metadata}
                onDownload={handleDownload}
                isDownloading={isDownloading}
                downloadProgress={downloadProgress}
                activeFormatId={activeFormatId}
                onCopyLink={handleCopyLink}
                onShare={handleShare}
              />
            </div>
          )}
        </div>

        {/* Infinite Scrolling Platform Marquee */}
        <PlatformMarquee />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Features Glassmorphism Grid */}
        <FeaturesGrid />

        {/* Local History Section */}
        <RecentDownloads
          history={history}
          onSelectUrl={(selectedUrl) => {
            setUrl(selectedUrl);
            handleFetchInfo(selectedUrl);
          }}
          onDeleteItem={handleDeleteHistoryItem}
          onClearAll={handleClearHistory}
        />

        {/* FAQ Accordion Section */}
        <FAQSection />
      </main>

      {/* Footer with Legal Disclaimer & DMCA */}
      <Footer
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenTerms={() => setLegalModal('terms')}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Legal Dialog Modal */}
      <LegalModal
        isOpen={legalModal !== null}
        type={legalModal || 'privacy'}
        onClose={() => setLegalModal(null)}
      />

      {/* Contact Support Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onShowToast={(msg) => showToast(msg, 'success')}
      />

      {/* Interactive Demo Test Links Modal */}
      <InteractiveDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onSelectSample={handleSelectSample}
      />

      {/* Toast Notification Alert */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: null, type: 'success' })}
      />
    </div>
  );
}
