// Base Axios configuration
// We assume Axios is loaded globally via CDN in the HTML layer.
// If using a bundler, you would import axios from 'axios' here.

export const API_BASE_URL = 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
