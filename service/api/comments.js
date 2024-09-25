import axios from "./axios";

const ENDPOINT = "/comments";

export async function deleteCommentById(commentId) {
  const res = await axios.delete(`${ENDPOINT}${commentId}`);
  return res.data;
}

export async function updateCommentById(commentId, editedComment) {
  const res = await axios.patch(`${ENDPOINT}${commentId}`, editedComment);
  return res.data;
}
