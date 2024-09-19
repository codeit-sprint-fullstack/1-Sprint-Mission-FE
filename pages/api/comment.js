import instance from "./axios.js";

export async function getArticleComments(id, limit = 5) {
  const res = await instance.get(`articles/${id}/comments`, {
    params: {
      limit,
    },
  });
  return res.data;
}

export async function getProductComments(id, limit = 5) {
  const res = await instance.get(`products/${id}/comments`, {
    params: {
      limit,
    },
  });
  return res.data;
}

export async function updateComment(id, item) {
  const res = await instance.patch(`/comments/${id}`, item);
  return res.data;
}

export async function createArticlesComment(item = {}, id) {
  const res = await instance.post(`articles/${id}/comments`, item);
  return res.data;
}

export async function createProductComment(item = {}, id) {
  const res = await instance.post(`products/${id}/comments`, item);
  return res.data;
}

export async function deleteComment(id) {
  const res = await instance.delete(`/comments/${id}`);
  return res.status;
}
