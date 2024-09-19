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

export async function getArticleById(articleId) {
  try {
    const res = await instance.get(`/api/articles/${articleId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createArticle(formData) {
  try {
    const res = await instance.post(`/api/articles`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateArticle(articleId, formData) {
  try {
    const res = await instance.patch(`/api/articles/${articleId}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteArticleById(articleId) {
  try {
    const res = await instance.delete(`/api/articles/${articleId}`);
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

export async function createArticleComment(articleId, newComment) {
  try {
    const res = await instance.post(
      `/api/articles/${articleId}/comments`,
      newComment
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCommentById(commentId) {
  try {
    const res = await instance.delete(`/api/comments/${commentId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCommentById(commentId, editedComment) {
  try {
    const res = await instance.patch(
      `/api/comments/${commentId}`,
      editedComment
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
