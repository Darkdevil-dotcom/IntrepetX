import axios from 'axios';

// 1. Get the base URL from env, ensuring we remove any trailing slashes
const envBase = import.meta.env.VITE_API_URL;
const apiBase = envBase ? envBase.replace(/\/$/, "") : 'http://localhost:5000';

// DEBUG: This will show up in your Browser Console (F12) 
// so you can see exactly where the frontend is trying to talk to.
console.log("Current API Base URL:", apiBase);

const api = axios.create({
  // This combines the base (http://localhost:5000) with /api
  baseURL: `${apiBase}/api`
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('narrative_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;