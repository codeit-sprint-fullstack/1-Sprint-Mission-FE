import axios from "./axios";

const ENDPOINT = "/comments";

export async function deleteCommentById(commentId) {
  try {
    const res = await axios.delete(`${ENDPOINT}${commentId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCommentById(commentId, editedComment) {
  try {
    const res = await axios.patch(`${ENDPOINT}${commentId}`, editedComment);
    return res.data;
  } catch (error) {
    throw error;
  }
}
