import axios from "axios";

const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// api/comments.js
export async function getComments(productId, limit) {
  try {
    const response = await api.get(`/products/${productId}/comments`, {
      params: {
        limit: limit,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export async function postComment(data, productId) {
  try {
    const response = await api.post(`/products/${productId}/comments`, data);
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}
