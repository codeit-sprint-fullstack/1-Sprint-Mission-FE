import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function getProducts(params = {}) {
  const res = await instance.get("/products", { params });
  return res.data;
}

export async function getProduct(id) {
  const res = await instance.get(`/products/${id}`);
  return res.data;
}

export async function updateProduct(id, item) {
  const res = await instance.patch(`/products/${id}`, item);
  return res.data;
}

export async function createProduct(item) {
  const res = await instance.post(`/products`, item);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await instance.delete(`/products/${id}`);
  return res.status;
}
