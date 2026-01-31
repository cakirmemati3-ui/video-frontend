'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Eye, Heart, Clock, Film } from 'lucide-react';
import type { VideoCardProps } from '@/types';
import { formatFileSize, formatViewCount, getPlatformIcon } from '@/lib/utils';

const VideoCard = ({ video, onDownload }: VideoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 space-y-6 animate-slide-up"
    >
      {/* Platform Badge */}
      <div className="flex items-center justify-between">
        <span className="px-4 py-2 bg-gradient-neon rounded-full text-sm font-bold">
          {getPlatformIcon(video.platform)} {video.platform}
        </span>
        {video.resolution && (
          <span className="px-4 py-2 bg-dark-lighter rounded-full text-sm font-semibold text-neon-blue">
            {video.resolution}
          </span>
        )}
      </div>

      {/* Thumbnail */}
      {video.thumbnail && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden group">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-20 h-20 bg-neon-purple/80 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Film className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Video Info */}
      <div className="space-y-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white leading-tight line-clamp-2">
          {video.title}
        </h2>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          {video.duration_string && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neon-blue" />
              <span>{video.duration_string}</span>
            </div>
          )}
          
          {video.view_count && (
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-neon-purple" />
              <span>{formatViewCount(video.view_count)} views</span>
            </div>
          )}
          
          {video.like_count && (
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-neon-pink" />
              <span>{formatViewCount(video.like_count)} likes</span>
            </div>
          )}
        </div>

        {/* Uploader */}
        {video.uploader && (
          <p className="text-gray-400">
            <span className="text-neon-blue font-semibold">@{video.uploader}</span>
          </p>
        )}

        {/* File Info */}
        {video.filesize_mb && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="px-3 py-1 bg-dark-lighter rounded-lg">
              {formatFileSize(video.filesize_mb)}
            </span>
            <span className="px-3 py-1 bg-dark-lighter rounded-lg uppercase">
              {video.ext}
            </span>
          </div>
        )}
      </div>

      {/* Download Button */}
      <motion.button
        onClick={onDownload}
        className="neon-button w-full text-xl font-bold py-6 flex items-center justify-center gap-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Download className="w-6 h-6" />
        HEMEN İNDİR
      </motion.button>

      {/* Description */}
      {video.description && (
        <details className="text-sm text-gray-400">
          <summary className="cursor-pointer font-semibold text-neon-blue hover:text-neon-purple transition-colors">
            Açıklamayı Göster
          </summary>
          <p className="mt-2 pl-4 border-l-2 border-dark-border">
            {video.description}
          </p>
        </details>
      )}

      {/* Watermark Free Badge for TikTok */}
      {video.platform === 'TikTok' && (
        <div className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-xl border border-neon-purple/30">
          <span className="text-sm font-semibold text-neon-purple">✨ Watermark-Free Download</span>
        </div>
      )}
    </motion.div>
  );
};

export default VideoCard;
