import axios from 'axios';
import { API_URL } from '../utils/constants.js';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 10000,
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors and standardize error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't log 404s for expected empty states (like no meters)
    if (error.response?.status !== 404) {
      console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
        }
      });
    }
    
    // Handle network errors (backend not available)
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error' || error.code === 'ECONNREFUSED') {
      const errorMessage = 'Unable to connect to the server. Please check your connection and try again.';
      error.userMessage = errorMessage;
      error.isNetworkError = true;
    }
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      const errorMessage = 'Request timed out. Please try again.';
      error.userMessage = errorMessage;
    }
    
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Add user-friendly message from response if available
    if (error.response?.data?.error && !error.userMessage) {
      error.userMessage = error.response.data.error;
    } else if (error.response?.data?.message && !error.userMessage) {
      error.userMessage = error.response.data.message;
    }
    
    return Promise.reject(error);
  }
);

export default api;

