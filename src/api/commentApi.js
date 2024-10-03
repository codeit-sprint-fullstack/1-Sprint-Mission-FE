import axiosInstance from "./axiosInstance";

// 상품에 댓글 추가
export const createComment = async (productId, content) => {
  const response = await axiosInstance.post(`/products/${productId}/comments`, {
    content: content,
  });
  return response.data;
};

// 상품의 댓글 목록 조회
export const getComments = async (productId, limit = 10, cursor = 0) => {
  const response = await axiosInstance.get(`/products/${productId}/comments`, {
    params: { limit: limit, cursor: cursor },
  });
  return response.data;
};

// 댓글 수정
export const updateComment = async (commentId, content) => {
  const response = await axiosInstance.patch(`/comments/${commentId}`, {
    content: content,
  });
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(`/comments/${commentId}`);
  return response.data;
};

