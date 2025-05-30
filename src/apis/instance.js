import axios from 'axios';

const API_BASE_URL
 = "";
//  "https://aaamovies.onrender.com/api";
const Instance = axios.create({
  baseURL: API_BASE_URL||"http://localhost:8080/api",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Instance;