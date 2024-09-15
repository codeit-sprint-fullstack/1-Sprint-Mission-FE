import instance from "./axios.js";

export async function updateComment(id, item) {
  try {
    const res = await instance.patch(`/comments/${id}`, item);
    return res.data;
  } catch (error) {
    console.error(`Failed to update comment with id ${id}:`, error);
    throw error; // 에러를 호출자에게 전달
  }
}

export async function createComment(item) {
  try {
    const res = await instance.post(`/comments`, item);
    return res.data;
  } catch (error) {
    console.error("Failed to create comment:", error);
    throw error; // 에러를 호출자에게 전달
  }
}

export async function deleteComment(id) {
  try {
    const res = await instance.delete(`/comments/${id}`);
    return res.status;
  } catch (error) {
    console.error(`Failed to delete comment with id ${id}:`, error);
    throw error; // 에러를 호출자에게 전달
  }
}
