// apiClient.js
import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
  //baseURL: process.env.REACT_APP_API_BASE_URL,
  baseURL: "https://api-dev.lmscarbon.com",
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// Add request interceptor to inject token dynamically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Authorization token missing');
      throw new axios.Cancel('No auth token provided');
    }
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling unauthorized errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      toast.error('Unauthorized request. Please login again.');
    } else if (!axios.isCancel(error)) {
      toast.error('Something went wrong while fetching the report');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
