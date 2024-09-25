import axios from "./axios";

const ENDPOINT = "/articles";

export async function getArticleList({
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

export async function getArticleById(articleId) {
  const res = await axios.get(`${ENDPOINT}/${articleId}`);
  return res.data;
}

export async function createArticle(formData) {
  const res = await axios.post(ENDPOINT, formData);
  return res.data;
}

export async function updateArticle(articleId, formData) {
  const res = await axios.patch(`${ENDPOINT}/${articleId}`, formData);
  return res.data;
}

export async function deleteArticleById(articleId) {
  const res = await axios.delete(`${ENDPOINT}/${articleId}`);
  return res.data;
}

export async function getArticleComments(articleId, params = {}) {
  const { limit = 5, cursor = null } = params;

  const res = await axios.get(`${ENDPOINT}/${articleId}/comments`, {
    params: { limit, cursor },
  });
  return res.data;
}

export async function createArticleComment(articleId, newComment) {
  const res = await axios.post(`${ENDPOINT}/${articleId}/comments`, newComment);
  return res.data;
}
