import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// IMPORTANT: Add /api to the baseURL
const api = axios.create({
  baseURL: API_URL + "/api",  // This makes it http://localhost:5000/api
  timeout: 10000,
});

// Add request interceptor for debugging (optional but helpful)
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
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

// Handle response errors globally
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject(new Error('Request timeout. Please check your connection.'));
    }
    
    if (!error.response) {
      console.error('Network error');
      return Promise.reject(new Error('Network error. Please check if the server is running.'));
    }
    
    console.error('Error response:', error.response?.data);
    return Promise.reject(error);
  }
);

export default api;