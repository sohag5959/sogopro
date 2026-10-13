# Sogopro – Personal Media Downloader

**Domain:** `sogopro.com`  
**Tagline:** *Download Anything. Anywhere. Fast. Free. HD.*

Sogopro is an ultra-fast, modern, cyberpunk-themed personal media downloader web application built with React 19, TypeScript, Express, and Tailwind CSS. It enables users to paste any video or audio link from YouTube, TikTok, Instagram, Twitter/X, Facebook, Vimeo, Reddit, and 100+ other platforms to extract 4K/1080p video or 320kbps MP3 audio with zero watermarks.

---

## ⚡ Features

- **Cyberpunk / Modern Tech Aesthetic:** Glassmorphism cards, glowing borders, smooth aurora animated backgrounds, and typography powered by *Space Grotesk* and *Inter*.
- **Broad Platform Support:** YouTube, YouTube Shorts, Instagram Reels & Posts, TikTok, Twitter/X, Facebook Watch, Vimeo, Reddit, Pinterest, Dailymotion, Snapchat, LinkedIn, and more.
- **Watermark-Free Option:** Automatically offers dedicated "No Watermark" clean downloads for short-form clips (TikTok, Instagram Reels).
- **High-Fidelity Audio Extraction:** 320 kbps studio MP3 & 128 kbps standard MP3.
- **Client-Side Progress & Celebration:** Animated progress indicator, instant stream saving, and confetti celebrations upon successful completion.
- **Local Download History:** Automatically caches user's recent downloads to `localStorage` with thumbnail previews, re-download shortcuts, and clear history controls.
- **PWA (Progressive Web App):** Installable on iOS Safari and Android Chrome with offline service worker shell and Web App Manifest.
- **SEO & Social Sharing:** Includes Schema.org `WebApplication` structured data, Open Graph tags, and Twitter Cards.
- **Dark & Light Mode:** Seamless toggle between cyberpunk dark mode and crisp high-contrast light mode.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or pnpm

### 1. Installation

Clone or open the repository, then install dependencies:

```bash
npm install
```

### 2. Environment Configuration

Copy the example configuration:

```bash
cp .env.example .env
```

Configuration variables available in `.env`:

| Variable | Description |
|---|---|
| `PORT` | Dev server port (default: `3000`) |
| `APP_URL` | Canonical app domain (`https://sogopro.com`) |
| `RAPIDAPI_KEY` | *(Optional)* Third-party video extractor API key |
| `YTDLP_PATH` | *(Optional)* Path to `yt-dlp` executable if installed on host system |

### 3. Running Locally

Start the full-stack server (runs Express API + Vite dev middleware on port 3000):

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser.

---

## 🔌 Real Downloader Logic Integration

Sogopro comes with an intelligent hybrid pipeline:
1. **Real oEmbed Extraction:** By default, Sogopro contacts public oEmbed APIs (YouTube, TikTok, Reddit, Vimeo) without requiring API keys to resolve actual video titles, authors, and thumbnails.
2. **Download Streaming:** Streams compliant media containers directly to the client browser with `Content-Disposition: attachment`.

### Where to plug in `yt-dlp` or third-party APIs:

Open `server.ts` and inspect the `POST /api/download` route:

```typescript
// To stream directly via yt-dlp binary:
import { spawn } from 'child_process';

const yt = spawn('yt-dlp', [
  '-f', formatId,
  '-o', '-',
  url
]);

res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
res.setHeader('Content-Type', isAudio ? 'audio/mpeg' : 'video/mp4');
yt.stdout.pipe(res);
```

Or connect a RapidAPI provider in `src/server/downloaderService.ts`:

```typescript
const response = await fetch(`https://${process.env.RAPIDAPI_HOST}/download`, {
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
  },
  body: JSON.stringify({ url }),
});
```

---

## 📦 Production Build & Deployment

### Build for Production:

```bash
npm run build
```

This compiles client-side assets into `/dist`.

### Start Production Server:

```bash
npm start
```

### Deployment Targets:
- **Render / Railway / Cloud Run:** Deploy the entire Node.js Express server (`server.ts` or `npm start`).
- **Vercel / Netlify:** Deploy `/dist` as static frontend or configure Serverless Functions under `/api`.

---

## ⚖️ Legal Disclaimer

Sogopro is intended solely for personal media archiving of content you own, have created, or hold explicit rights to download. Sogopro does not host, store, or index copyrighted material. Users are responsible for complying with the terms of service of any third-party websites they access.
