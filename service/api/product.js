import axios from "./axios";

const PATH = "/products";

export async function getProductList({
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
  page = 1,
}) {
  const res = await axios.get(PATH, {
    params: { pageSize, keyword, orderBy, page },
  });
  return res.data;
}

export async function getProductById(productId) {
  const res = await axios.get(`${PATH}/${productId}`);
  return res.data;
}

export async function deleteProductById(productId) {
  const res = await axios.delete(`${PATH}/${productId}`);
  return res.data;
}

export async function getProductComments(productId, params = {}) {
  const { limit = 5, cursor = null } = params;

  const res = await axios.get(`${PATH}/${productId}/comments`, {
    params: { limit, cursor },
  });
  return res.data;
}

export async function createProductComment(productId, newComment) {
  const res = await axios.post(`${PATH}/${productId}/comments`, newComment);
  return res.data;
}

export async function createProduct(newProduct) {
  const res = await axios.post(PATH, newProduct, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function updateProductById(productId, productData) {
  const res = await axios.patch(`${PATH}/${productId}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function createProductFavorite(productId) {
  const res = await axios.post(`${PATH}/${productId}/favorite`);
  return res.data;
}

export async function deleteProductFavorite(productId) {
  const res = await axios.delete(`${PATH}/${productId}/favorite`);
  return res.data;
}
