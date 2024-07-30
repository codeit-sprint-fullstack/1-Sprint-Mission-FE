import axios from 'axios';

export async function getItems(page, pageSize, orderBy) {
  const orderPage = `page=${page}`;
  const oderSize = `pageSize=${pageSize}`;
  const orderSort = `orderBy=${orderBy}`;
  const response = await axios.get(
    `https://panda-market-api.vercel.app/products?${orderPage}&${oderSize}&${orderSort}`
  );
  return response.data.list;
}

export async function getProductLength() {
  const response = await axios.get(
    `https://panda-market-api.vercel.app/products`
  );
  return response.data;
}
