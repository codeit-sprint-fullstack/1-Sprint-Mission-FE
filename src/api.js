import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://myproducts-api.onrender.com',
  timeout: 3000,
});

export async function getProducts({ page, limit, sort, search }) {
  const params = {
    page: page.toString(),
    limit: limit.toString(),
  };

  if (sort) {
    params.sort = sort;
  }
  if (search) {
    params.search = search;
  }

  const response = await instance.get('/products', { params });
  return response.data;
}

export async function createProduct(productData) {
  const res = await instance.post('/registration', productData);
  return res.data;
}
