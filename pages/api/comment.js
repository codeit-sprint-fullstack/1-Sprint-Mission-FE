import instance from "./axios.js";

export async function updateComment(id, item) {
  const res = await instance.patch(`/comments/${id}`, item);
  return res.data;
}

export async function createComment(item) {
  const res = await instance.post(`/comments`, item);
  return res.data;
}

export async function deleteComment(id) {
  const res = await instance.delete(`/comments/${id}`);
  return res.status;
}
