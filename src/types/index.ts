// API Response Types

export interface VideoFormat {
  format_id: string;
  format_note?: string;
  ext: string;
  quality?: string;
  filesize?: number;
  filesize_mb?: number;
  resolution?: string;
  fps?: number;
  vcodec?: string;
  acodec?: string;
}

export interface VideoInfo {
  success: boolean;
  title: string;
  duration?: number;
  duration_string?: string;
  thumbnail?: string;
  direct_url: string;
  platform: string;
  uploader?: string;
  view_count?: number;
  like_count?: number;
  description?: string;
  filesize_mb?: number;
  resolution?: string;
  ext: string;
  formats?: VideoFormat[];
}

export interface ErrorResponse {
  success: false;
  error: string;
  detail?: string;
  timestamp?: string;
}

export type ApiResponse = VideoInfo | ErrorResponse;

// Component Props
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export interface VideoCardProps {
  video: VideoInfo;
  onDownload: () => void;
}
