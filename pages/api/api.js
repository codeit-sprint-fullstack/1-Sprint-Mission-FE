import axios from "axios";

const api = axios.create({
  baseURL: "https://aritlces.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getArticles(params) {
  try {
    const response = await api.get("/articles", {
      params: params, // 쿼리 파라미터로 전달
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}
