import axios from "./axios";

const ENDPOINT = "/products";
export async function getProductList({
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
  page = 1,
}) {
  const res = await axios.get(ENDPOINT, {
    params: { pageSize, keyword, orderBy, page },
  });
  return res.data;
}

export async function getProductById(productId) {
  try {
    const res = await axios.get(`${ENDPOINT}/${productId}`);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function deleteProductById(productId) {
  const res = await axios.delete(`${ENDPOINT}/${productId}`);
  return res.data;
}

export async function getProductComments(productId, params = {}) {
  const { limit = 5, cursor = null } = params;

  const res = await axios.get(`${ENDPOINT}/${productId}/comments`, {
    params: { limit, cursor },
  });
  return res.data;
}

export async function createProductComment(productId, newComment) {
  const res = await axios.post(`${ENDPOINT}/${productId}/comments`, newComment);
  return res.data;
}
