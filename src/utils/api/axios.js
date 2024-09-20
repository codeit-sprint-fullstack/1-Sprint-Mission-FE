import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DATABASE_URL || 'https://mini1018.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
