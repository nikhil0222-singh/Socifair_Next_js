import axios from 'axios';

const WAKAPI_BASE_URL = '/api/wakapi';

// Create axios instance with default config
const wakapiApi = axios.create({
  baseURL: WAKAPI_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Important for cookie-based auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle common errors
wakapiApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface WakapiUser {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface WakapiStats {
  total_seconds: number;
  languages: Array<{
    name: string;
    total_seconds: number;
    percent: number;
  }>;
  projects: Array<{
    name: string;
    total_seconds: number;
    percent: number;
  }>;
  editors: Array<{
    name: string;
    total_seconds: number;
    percent: number;
  }>;
}

export interface WakapiSummary {
  data: Array<{
    range: {
      start: string;
      end: string;
    };
    languages: Array<{
      name: string;
      total_seconds: number;
      percent: number;
    }>;
    projects: Array<{
      name: string;
      total_seconds: number;
      percent: number;
    }>;
  }>;
}

// Authentication
export const wakapiAuth = {
  login: async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    
    try {
      const response = await wakapiApi.post('/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        maxRedirects: 0, // Don't follow redirects
        validateStatus: (status) => status >= 200 && status < 400, // Accept redirects as success
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      if (error.response?.status === 302) {
        // Redirect means successful login
        return { success: true, redirect: true };
      }
      throw error;
    }
  },

  register: async (username: string, email: string, password: string) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('email', email);
    params.append('password', password);
    params.append('password_repeat', password);
    
    try {
      const response = await wakapiApi.post('/signup', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        maxRedirects: 0, // Don't follow redirects
        validateStatus: (status) => status >= 200 && status < 400, // Accept redirects as success
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      if (error.response?.status === 302) {
        // Redirect means successful registration
        return { success: true, redirect: true };
      }
      throw error;
    }
  },

  logout: async () => {
    const response = await wakapiApi.post('/logout');
    return response.data;
  },

  // Check if user is authenticated by trying to access a protected endpoint
  checkAuth: async () => {
    try {
      const response = await wakapiApi.get('/v1/users/current/stats/today');
      return { authenticated: true, user: response.data };
    } catch (error) {
      return { authenticated: false };
    }
  },
};

// User data
export const wakapiUser = {
  getProfile: async (): Promise<WakapiUser> => {
    // Note: In Wakapi, user profile is handled via cookies and server-side rendering
    // For now, return mock data or handle via different approach
    throw new Error('User profile API requires cookie-based authentication');
  },
};

// Statistics
export const wakapiStats = {
  getStats: async (range: string = 'last_7_days'): Promise<WakapiStats> => {
    const response = await wakapiApi.get(`/v1/users/current/stats/${range}`);
    return response.data.data; // WakaTime API wraps data in a 'data' property
  },

  getSummary: async (start: string, end: string): Promise<WakapiSummary> => {
    const response = await wakapiApi.get('/compat/wakatime/v1/users/current/summaries', {
      params: { start, end },
    });
    return response.data;
  },

  getHeartbeats: async (date: string) => {
    const response = await wakapiApi.get('/api/users/current/heartbeats', {
      params: { date },
    });
    return response.data;
  },

  // Get today's stats
  getTodayStats: async () => {
    const response = await wakapiApi.get('/v1/users/current/stats/today');
    return response.data.data;
  },

  // Get weekly stats  
  getWeeklyStats: async () => {
    const response = await wakapiApi.get('/v1/users/current/stats/last_7_days');
    return response.data.data;
  },
};

// Utility functions
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

export const formatBytes = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export default wakapiApi;