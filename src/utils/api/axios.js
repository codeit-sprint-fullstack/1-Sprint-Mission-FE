import axios from 'axios';

const articleApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DATABASE_URL || 'https://mini1018.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const codeitApi = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { articleApi, codeitApi };
