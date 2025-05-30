import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL = "https://aaamovies.onrender.com/api";

const Instance = axios.create({
  baseURL: API_BASE_URL || "http://localhost:8080/api",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động retry tối đa 3 lần nếu gặp lỗi timeout hoặc lỗi mạng
axiosRetry(Instance, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.warn(`⏳ Retry attempt #${retryCount}`);
    return retryCount * 1000; 
  },
  retryCondition: (error) => {
    return error.code === 'ECONNABORTED' || error.message.includes('timeout');
  },
});

export default Instance;
