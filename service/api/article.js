import axios from "./axios";

const ENDPOINT = "/articles";

export async function getArticleList({
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
  page = 1,
}) {
  try {
    const res = await axios.get(ENDPOINT, {
      params: { pageSize, keyword, orderBy, page },
    });
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function getArticleById(articleId) {
  try {
    const res = await axios.get(`${ENDPOINT}/${articleId}`);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function createArticle(formData) {
  try {
    const res = await axios.post(ENDPOINT, formData);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function updateArticle(articleId, formData) {
  try {
    const res = await axios.patch(`${ENDPOINT}/${articleId}`, formData);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function deleteArticleById(articleId) {
  try {
    const res = await axios.delete(`${ENDPOINT}/${articleId}`);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function getArticleComments(articleId, params = {}) {
  const { limit = 5, cursor = null } = params;
  try {
    const res = await axios.get(`${ENDPOINT}/${articleId}/comments`, {
      params: { limit, cursor },
    });
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function createArticleComment(articleId, newComment) {
  try {
    const res = await axios.post(
      `${ENDPOINT}/${articleId}/comments`,
      newComment
    );
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}
