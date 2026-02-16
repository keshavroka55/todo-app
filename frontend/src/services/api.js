import axios from 'axios';
import { API_URL } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - runs before every request
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here later
    console.log(`🚀 [API] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ [API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - runs after every response
api.interceptors.response.use(
  (response) => {
    console.log(`✅ [API] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('❌ [API] Response error:', error.response.data);
      
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          console.log('Unauthorized access');
          break;
        case 404:
          console.log('Resource not found');
          break;
        case 500:
          console.log('Server error');
          break;
        default:
          console.log('An error occurred');
      }
    } else if (error.request) {
      // Request was made but no response
      console.error('❌ [API] No response from server');
    } else {
      // Something else happened
      console.error('❌ [API] Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;