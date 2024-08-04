// src/api.js
import axios from "axios";

const API_URL = "https://panda-market-api.vercel.app/api/products";

export const fetchProducts = async ({
  page = 1,
  pageSize = 10,
  sortBy = "createdAt",
  keyword = "",
}) => {
  const params = new URLSearchParams({
    page,
    pageSize,
    sortBy,
    keyword,
  });

  try {
    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("데이터를 불러오는데 실패했습니다."); // 사용자에게 보여줄 오류 메시지
  }
};
