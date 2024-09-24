import apiHandler from "./apiHandler";
import apiClient from "./apiClient";

export async function fetchComments(id, cursor = 0) {
  return apiHandler(async () => {
    const response = await apiClient.get(
      `/products/${id}/comments?limit=4&cursor=${cursor}`
    );
    return response.data;
  });
}

export async function addComment(id, comment) {
  return apiHandler(async () => {
    const response = await apiClient.post(`/products/${id}/comments`, comment);

    return response.data;
  });
}

export async function editComment(id, comment) {
  return apiHandler(async () => {
    const response = await apiClient.patch(`/comments/${id}`, comment);

    return response.data;
  });
}

export async function deleteComment(id) {
  return apiHandler(async () => {
    const response = await apiClient.delete(`/comments/${id}`);

    return response.data;
  });
}
