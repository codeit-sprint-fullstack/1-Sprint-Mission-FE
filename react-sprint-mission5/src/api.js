// src/api.js
import axios from "axios";

const API_URL = "https://panda-market-api.vercel.app/api/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};
