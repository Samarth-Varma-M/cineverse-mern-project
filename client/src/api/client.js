import axios from 'axios';

// Default production backend on Render
const DEFAULT_API_HOST = 'https://cineverse-mern-project.onrender.com';

let rawBase = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.trim()
  : (import.meta.env.DEV ? '' : DEFAULT_API_HOST);

// Strip trailing slashes
rawBase = rawBase.replace(/\/+$/, '');

// If user already included /api at the end, strip it so we don't duplicate
rawBase = rawBase.replace(/\/api$/, '');

// Final clean base URL
const baseURL = rawBase ? `${rawBase}/api` : '/api';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-attach JWT token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cineverse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
