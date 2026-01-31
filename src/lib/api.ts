import axios, { AxiosError } from 'axios';
import type { VideoInfo, ErrorResponse } from '@/types';

const API_BASE_URL = 'https://video-backend-production-075e.up.railway.app';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Fetch video information from URL
 */
export const fetchVideoInfo = async (url: string): Promise<VideoInfo> => {
  try {
    const response = await api.post<VideoInfo>('/api/fetch', { url });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data as ErrorResponse;
      throw new Error(errorData.error || errorData.detail || 'Video bilgisi alınamadı');
    }
    throw new Error('Sunucu ile bağlantı kurulamadı. Backend çalışıyor mu?');
  }
};

/**
 * Health check
 */
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await api.get('/api/health');
    return response.status === 200;
  } catch {
    return false;
  }
};

/**
 * Get supported platforms
 */
export const getSupportedPlatforms = async () => {
  try {
    const response = await api.get('/api/platforms');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch platforms:', error);
    return null;
  }
};

export default api;
