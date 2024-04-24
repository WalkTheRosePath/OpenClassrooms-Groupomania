// frontend/src/utils/api.js
// API utility to make HTTP requests to the backend server

// Import required modules
import axios from "axios";

// Backend server URL
const BASE_URL = "http://localhost:3000"; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
