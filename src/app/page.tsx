'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, Instagram, Youtube, Music } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import VideoCard from '@/components/VideoCard';
import { fetchVideoInfo } from '@/lib/api';
import { isValidUrl, detectPlatform, downloadFile } from '@/lib/utils';
import type { VideoInfo } from '@/types';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFetch = async () => {
    // Validation
    if (!url.trim()) {
      toast.error('Lütfen bir URL girin!');
      return;
    }

    if (!isValidUrl(url)) {
      toast.error('Geçerli bir URL girin!');
      return;
    }

    const platform = detectPlatform(url);
    if (!platform) {
      toast.error('Sadece Instagram, TikTok ve YouTube linkleri destekleniyor!');
      return;
    }

    // Fetch video info
    setLoading(true);
    setVideoInfo(null);

    try {
      const info = await fetchVideoInfo(url);
      setVideoInfo(info);
      toast.success(`Video bulundu! ${info.platform} - ${info.title.substring(0, 30)}...`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!videoInfo) return;
    
    try {
      downloadFile(videoInfo.direct_url, `${videoInfo.title}.${videoInfo.ext}`);
      toast.success('İndirme başlatıldı!');
    } catch (error) {
      toast.error('İndirme başlatılamadı. Linke tıklayarak manuel indirebilirsiniz.');
      window.open(videoInfo.direct_url, '_blank');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-neon-purple animate-float" />
            <h1 className="text-5xl md:text-6xl font-black text-gradient">
              Video Downloader Pro
            </h1>
            <Sparkles className="w-12 h-12 text-neon-blue animate-float" />
          </div>

          <p className="text-xl text-gray-400 mb-8">
            Instagram, TikTok ve YouTube videolarını saniyeler içinde indir
          </p>

          {/* Platform Icons */}
          <div className="flex items-center justify-center gap-6">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
            >
              <Instagram className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center"
            >
              <Music className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center"
            >
              <Youtube className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8 mb-8"
        >
          <div className="space-y-4">
            {/* Input */}
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Video linkini buraya yapıştır..."
                className="neon-input w-full text-lg"
                disabled={loading}
              />
              
              {/* Focus Ring Animation */}
              {isFocused && (
                <motion.div
                  layoutId="inputRing"
                  className="absolute inset-0 rounded-2xl border-2 border-neon-blue pointer-events-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                />
              )}
            </div>

            {/* Search Button */}
            <motion.button
              onClick={handleFetch}
              disabled={loading}
              className="neon-button w-full text-lg flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Aranıyor...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Video Bul
                </>
              )}
            </motion.button>
          </div>

          {/* Tips */}
          <div className="mt-6 text-sm text-gray-400 text-center space-y-1">
            <p>💡 Instagram Reels, TikTok veya YouTube linki yapıştır</p>
            <p className="text-neon-purple">✨ TikTok videoları watermark-free indirilir!</p>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <LoadingSpinner text="Video aranıyor..." />
        )}

        {/* Video Result */}
        {!loading && videoInfo && (
          <VideoCard video={videoInfo} onDownload={handleDownload} />
        )}

        {/* Features */}
        {!loading && !videoInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                icon: '⚡',
                title: 'Hızlı İndirme',
                desc: 'Saniyeler içinde video bilgilerini al'
              },
              {
                icon: '🎯',
                title: 'En İyi Kalite',
                desc: 'Maksimum çözünürlükte indir'
              },
              {
                icon: '✨',
                title: 'Watermark-Free',
                desc: 'TikTok videoları filigransız'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center space-y-3"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center text-gray-500 text-sm"
        >
          <p>Made with ❤️ by Elite Full-Stack Developer</p>
          <p className="mt-2">
            Eğitim amaçlıdır. Lütfen telif haklarına saygı gösterin.
          </p>
        </motion.footer>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#141B3C',
            color: '#fff',
            border: '1px solid #2A3659',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#00D4FF',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF006E',
              secondary: '#fff',
            },
          },
        }}
      />
    </main>
  );
}
