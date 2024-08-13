import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://myproducts-api.onrender.com',
  timeout: 3000,
});

export async function getProducts({ page = 1, limit = 10, sort, search }) {
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

export async function getItemByName(name) {
  const result = await getProducts({ search: name });
  const { products } = result;

  return products.find((product) => product.name === name);
}
