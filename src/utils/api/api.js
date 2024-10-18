import { renderApi } from './axios.js';

export async function getArticleList(query) {
  try {
    const response = await renderApi.get('/articles', {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error(error.status);
  }
}

export async function getArticle(id) {
  try {
    const response = await renderApi.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.status);
  }
}

export async function postArticle(params) {
  try {
    const response = await renderApi.post('/articles', params);
    return response.data;
  } catch (error) {
    console.error(error.status);
  }
}

export async function deleteArticle(id) {
  try {
    const response = await renderApi.delete(`/articles/${id}`);
    return response;
  } catch (error) {
    console.error(error.status);
  }
}

export async function patchArticle(id, params) {
  try {
    const response = await renderApi.patch(`/articles/${id}`, params);
    return response.data;
  } catch (error) {
    console.error(error.status);
  }
}

export async function getComment(id) {
  try {
    const response = await renderApi.get(`/articles/${id}/comments`);
    return response.data;
  } catch (error) {
    console.error(error.response ? error.response.status : error.message);
  }
}

export async function postComment({ articleId, content }) {
  try {
    const response = await renderApi.post(`/articles/${articleId}/comments`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error.status);
  }
}

export async function deleteComment({ articleId, commentId }) {
  try {
    const response = await renderApi.delete(
      `/articles/${articleId}/comments/${commentId}`
    );
    return response;
  } catch (error) {
    console.error(error.status);
  }
}
