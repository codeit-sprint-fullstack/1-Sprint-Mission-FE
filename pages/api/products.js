import axios from "axios";

const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getProduct(productId) {
  try {
    const response = await api.get(`/products/${productId}`);
    return response;
  } catch (error) {
    return error.response;
  }
}
