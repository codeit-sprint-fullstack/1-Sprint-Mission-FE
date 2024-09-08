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
