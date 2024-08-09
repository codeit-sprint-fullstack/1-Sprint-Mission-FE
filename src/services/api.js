import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://one-sprint-mission-be-hu1k.onrender.com',
  headers: { 'Content-type': 'application/json' },
});

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
}) {
  try {
    const res = await instance.get('/api/products', {
      params: { page, pageSize, orderBy, keyword },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function postProduct(formData) {
  try {
    const res = await instance.post('/api/products', formData);
    return res.data;
  } catch (error) {
    throw error;
  }
}
