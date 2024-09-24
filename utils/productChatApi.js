import apiHandler from "./apiHandler";
import apiClient from "./apiClient";

const baseUrl = "https://panda-market-api.vercel.app";

export async function fetchComments(id, cursor = 0) {
  return apiHandler(async () => {
    const response = await apiClient.get(
      `${baseUrl}/products/${id}/comments?limit=4&cursor=${cursor}`
    );
    return response.data;
  });
}

export async function fetchMoreComments(productId, cursor) {
  return apiHandler(async () => {
    const response = await apiClient.get(
      `${baseUrl}/products/${productId}/comments?limit=4&cursor=${cursor}`
    );
    return response.data;
  });
}

export async function addComment(id, comment) {
  return apiHandler(async () => {
    const response = await apiClient.post(
      `${baseUrl}/products/${id}/comments`,
      comment
    );

    return response.data;
  });
}

export async function editComment(id, comment) {
  return apiHandler(async () => {
    const response = await apiClient.patch(
      `${baseUrl}/comments/${id}`,
      comment
    );

    return response.data;
  });
}

export async function deleteComment(id) {
  return apiHandler(async () => {
    const response = await apiClient.delete(`${baseUrl}/comments/${id}`);

    return response.data;
  });
}
