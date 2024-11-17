import { productApi } from "./clients";
import { handleApiError } from "./apiErrorHandler";

export const getComments = async (productId, cursor = 0, limit) => {
  try {
    const response = await productApi.get(`/products/${productId}/comments`, {
      params: { limit, cursor },
    });
    console.log(`Page ${cursor} response:`, response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addComment = async (productId, content) => {
  try {
    const response = await productApi.post(`/products/${productId}/comments`, {
      content,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateComment = async (productId, commentId, content) => {
  try {
    const response = await productApi.patch(`/comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteComment = async (productId, commentId) => {
  try {
    const response = await productApi.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
