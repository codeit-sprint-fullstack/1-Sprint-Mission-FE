import instance from "./axios";

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

export async function likeProduct(id) {
  console.log("확인");
  const res = await instance.post(`/products/${id}/favorite`);
  return res.data;
}

export async function unlikeProduct(id) {
  const res = await instance.delete(`/products/${id}/favorite`);
  return res.data;
}
