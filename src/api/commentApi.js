import axiosInstance from "./axiosInstance";

// 상품에 댓글 추가
export const createComment = async (productId, content) => {
  try {
    const response = await axiosInstance.post(`/products/${productId}/comments`, {
      content: content,
    });
    return response.data;
  } catch (error) {
    console.error("댓글 추가 실패:", error.response ? error.response.data : error.message);
    return null;
  }
};

// 상품의 댓글 목록 불러오기
export const getComments = async (productId, limit = 10, cursor = 0) => {
  if (!productId) {
    console.error("productId가 존재하지 않습니다.");
    return [];
  }

  try {
    const response = await axiosInstance.get(`/products/${productId}/comments`, {
      params: { limit: limit, cursor: cursor },
    });
    return response.data;
  } catch (error) {
    console.error("댓글 목록 불러오기 실패:", error.response ? error.response.data : error.message);
    return [];
  }
};

// 댓글 수정
export const updateComment = async (commentId, content) => {
  try {
    const response = await axiosInstance.patch(`/comments/${commentId}`, {
      content: content,
    });
    return response.data;
  } catch (error) {
    console.error(`댓글 수정 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    return null;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const response = await axiosInstance.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(`댓글 삭제 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    return null;
  }
};

