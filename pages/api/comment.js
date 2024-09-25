import instance from "./httpClient.js";

export async function getArticleComments(id, cursor = 0, limit = 5) {
  const res = await instance.get(`articles/${id}/comments`, {
    params: {
      limit,
      cursor,
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

export async function createArticlesComment(content = "", articleId) {
  const res = await instance.post(`articles/${articleId}/comments`, {
    content,
  });
  return res.data;
}

export async function createProductComment(content = "", productId) {
  const res = await instance.post(`products/${productId}/comments`, {
    content,
  });
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
