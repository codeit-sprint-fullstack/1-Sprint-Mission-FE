import axios from 'axios';

async function fetchData(query) {
  const response = await axios.get(
    `https://panda-market-api.vercel.app/${query}`
  );
  return response;
}

export async function getItems(page, pageSize, orderBy) {
  const orderPage = `page=${page}`;
  const oderSize = `pageSize=${pageSize}`;
  const orderSort = `orderBy=${orderBy}`;
  const query = `products?${orderPage}&${oderSize}&${orderSort}`;
  const response = await fetchData(query);
  return response.data.list;
}

export async function getProductLength() {
  const response = await fetchData('products');
  return response.data;
}
