/**
 * Format file size from MB to human readable
 */
export const formatFileSize = (mb?: number): string => {
  if (!mb) return 'Unknown';
  if (mb < 1) return `${(mb * 1024).toFixed(0)} KB`;
  if (mb > 1024) return `${(mb / 1024).toFixed(2)} GB`;
  return `${mb.toFixed(2)} MB`;
};

/**
 * Format duration from seconds to MM:SS
 */
export const formatDuration = (seconds?: number): string => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format view count to K/M notation
 */
export const formatViewCount = (count?: number): string => {
  if (!count) return '0';
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

/**
 * Validate URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Detect platform from URL
 */
export const detectPlatform = (url: string): string | null => {
  const urlLower = url.toLowerCase();
  if (urlLower.includes('instagram.com') || urlLower.includes('instagr.am')) {
    return 'Instagram';
  }
  if (urlLower.includes('tiktok.com')) {
    return 'TikTok';
  }
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return 'YouTube';
  }
  return null;
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Download file from URL
 */
export const downloadFile = (url: string, filename: string = 'video.mp4') => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Get platform icon emoji
 */
export const getPlatformIcon = (platform: string): string => {
  const icons: Record<string, string> = {
    Instagram: '📸',
    TikTok: '🎵',
    YouTube: '🎥',
  };
  return icons[platform] || '📹';
};

/**
 * Truncate text
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
