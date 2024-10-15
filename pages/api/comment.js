import instance from "./httpClient.js";

export async function getArticleComments(id, cursor) {
  const res = await instance.get(`comments/${id}/article`, {
    params: {
      limit: 5,
      cursor,
    },
  });
  return res.data;
}

export async function getProductComments(id, cursor) {
  const res = await instance.get(`comments/${id}/product`, {
    params: {
      limit: 5,
      cursor,
    },
  });
  return res.data;
}

export async function createArticlesComment(params = {}, articleId) {
  const res = await instance.post(`comments/${articleId}/article`, params);
  return res.data;
}

export async function createProductComment(params = {}, productId) {
  const res = await instance.post(`comments/${productId}/product`, params);
  return res.data;
}

export async function updateComment(commentId, item) {
  const res = await instance.patch(`/comments/${commentId}`, item);
  return res.data;
}

export async function deleteComment(commentId) {
  const res = await instance.delete(`/comments/${commentId}`);
  return res.status;
}
