import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-type": "application/json" },
});

export async function getArticleList({
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
  page = 1,
}) {
  try {
    const res = await instance.get("/api/articles", {
      params: { pageSize, keyword, orderBy, page },
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

export async function getArticleComments(articleId, params = {}) {
  const { limit = 5, cursor = null } = params;
  try {
    const res = await instance.get(`/api/articles/${articleId}/comments`, {
      params: { limit, cursor },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
