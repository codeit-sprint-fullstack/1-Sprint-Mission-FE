import axios from "./axios";

const PATH = "/comments";

export async function deleteCommentById(commentId) {
  const res = await axios.delete(`${PATH}/${commentId}`);
  return res.data;
}

export async function updateCommentById(commentId, editedComment) {
  const res = await axios.patch(`${PATH}/${commentId}`, editedComment);
  return res.data;
}
