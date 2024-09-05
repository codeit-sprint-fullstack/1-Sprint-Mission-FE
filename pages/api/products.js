import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export async function getProductsAxios(params = {}) {
  const res = await instance.get("/products", { params });
  return res.data;
}

export async function getProductAxios(id) {
  const res = await instance.get(`/products/${id}`);
  return res.data;
}

export async function updateProductAxios(id, item) {
  const res = await instance.patch(`/products/${id}`, item);
  return res.data;
}

export async function createProductAxios(item) {
  const res = await instance.post(`/products`, item);
  return res.data;
}

export async function deleteProductAxios(id) {
  const res = await instance.delete(`/products/${id}`);
  return res.status;
}
