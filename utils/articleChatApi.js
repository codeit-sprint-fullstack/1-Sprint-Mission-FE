import apiClient from "./apiClient";

// 댓글 조회
export async function fetchComments(id, cursor = null) {
  const response = await apiClient.get(
    `/articles/${id}/comments?cursor=${cursor}`
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch comments");
  }

  return response.data;
}

// 댓글 삭제
export async function deleteComments(id) {
  const response = await apiClient.delete(`/comments/${id}`);

  if (response.status !== 204) {
    throw new Error("Failed to delete comments");
  }

  return response.data;
}

// 댓글 생성
export async function createComments(id, formData) {
  const response = await apiClient.post(`/articles/${id}/comments`, formData);

  if (response.status !== 201) {
    throw new Error("Failed to create comments");
  }

  return response.data;
}

// 댓글 수정
export async function updateComments(id, formData) {
  const response = await apiClient.patch(`/comments/${id}`, formData);

  if (response.status !== 200) {
    throw new Error("Failed to update comments");
  }

  return response.data;
}
