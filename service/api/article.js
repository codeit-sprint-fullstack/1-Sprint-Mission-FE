import axios from "./axios";

const PATH = "/articles";

export async function getArticleList({
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
  page = 1,
}) {
  const res = await axios.get(PATH, {
    params: { pageSize, keyword, orderBy, page },
  });
  return res.data;
}

export async function getArticleById(articleId) {
  const res = await axios.get(`${PATH}/${articleId}`);
  return res.data;
}

export async function createArticle(formData) {
  const res = await axios.post(PATH, formData);
  return res.data;
}

export async function updateArticle(articleId, formData) {
  const res = await axios.patch(`${PATH}/${articleId}`, formData);
  return res.data;
}

export async function deleteArticleById(articleId) {
  const res = await axios.delete(`${PATH}/${articleId}`);
  return res.data;
}

export async function getArticleComments(articleId, params = {}) {
  const { limit = 5, cursor = null } = params;

  const res = await axios.get(`${PATH}/${articleId}/comments`, {
    params: { limit, cursor },
  });
  return res.data;
}

export async function createArticleComment(articleId, newComment) {
  const res = await axios.post(`${PATH}/${articleId}/comments`, newComment);
  return res.data;
}
