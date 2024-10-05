import apiHandler from "./apiHandler";
import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./apiEndpoint";

export async function fetchComments(id, cursor = null) {
  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    throw new Error(`Invalid ID: ${id}`);
  }
  return apiHandler(async () => {
    const response = await apiClient.get(
      API_ENDPOINTS.PRODUCTS.FETCH_COMMENTS(productId, cursor)
    );
    return response.data;
  });
}

export async function addComment(id, comment) {
  return apiHandler(async () => {
    const response = await apiClient.post(
      API_ENDPOINTS.PRODUCTS.ADD_COMMENT(id),
      comment
    );

    return response.data;
  });
}

export async function editComment(id, comment) {
  return apiHandler(async () => {
    const response = await apiClient.patch(
      API_ENDPOINTS.PRODUCTS.DETAIL_COMMENT(id),
      comment
    );

    return response.data;
  });
}

export async function deleteComment(id) {
  return apiHandler(async () => {
    const response = await apiClient.delete(
      API_ENDPOINTS.PRODUCTS.DETAIL_COMMENT(id)
    );

    return response.data;
  });
}
