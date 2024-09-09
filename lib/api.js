import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-type": "application/json" },
});

export async function getArticleList({
  limit = 10,
  sortBy = "recent",
  keyword = "",
  lastId = null,
}) {
  try {
    const res = await instance.get("/api/articles", {
      params: { lastId, limit, keyword, sortBy },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getArticleById(id) {
  try {
    const res = await instance.get(`/api/articles/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateArticle(id) {
  try {
    const res = await instance.patch(`/api/articles/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
