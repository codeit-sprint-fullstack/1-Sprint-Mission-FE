import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
  header: { 'Content-type': 'application/json' },
});

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
}) {
  try {
    const res = await instance.get('/products', {
      params: { page, pageSize, orderBy, keyword },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
