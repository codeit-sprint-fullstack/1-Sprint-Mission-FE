import axios from "./axios";

const ENDPOINT = "/products";
export async function getProductList({
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
  page = 1,
}) {
  try {
    const res = await axios.get(ENDPOINT, {
      params: { pageSize, keyword, orderBy, page },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(productId) {
  try {
    const res = await axios.get(`${ENDPOINT}/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductById(productId) {
  try {
    const res = await axios.delete(`${ENDPOINT}/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getProductComments(productId, params = {}) {
  const { limit = 5, cursor = null } = params;
  try {
    const res = await axios.get(`${ENDPOINT}/${productId}/comments`, {
      params: { limit, cursor },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createProductComment(productId, newComment) {
  try {
    const res = await axios.post(
      `${ENDPOINT}/${productId}/comments`,
      newComment
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
