import api from './axios.js';

export async function getArticleList(query) {
  try {
    const response = await api.get('/articles', {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error(error.status);
  }
}

export async function getArticle(id) {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.status);
  }
}

export async function postArticle(params) {
  try {
    const response = await api.post('/articles', params);
    return response.data;
  } catch (error) {
    console.error(error.status);
  }
}
