import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Instance = axios.create({
  baseURL: API_BASE_URL||"http://localhost:8080/api",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Instance;