import axiosInstance from "./axiosInstance";

// 상품에 댓글 추가
export const createComment = async (productId, content) => {
  try {
    //  /api/comments/products/:productId/comments
    const response = await axiosInstance.post(`/comments/products/${productId}/comments`, {
      content: content,
    });
    console.log("댓글 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("댓글 등록 실패:", error.response ? error.response.data : error.message);
    return null;
  }
};

// 상품의 댓글 목록 불러오기
export const getComments = async (productId, limit = 10, cursor = 0) => {
  console.log("전달된 productId:", productId);
  if (!productId) {
    console.error("productId가 존재하지 않습니다.");
    return [];
  }

  try {
    //  /api/comments/products/:productId/comments
    const response = await axiosInstance.get(`/comments/products/${productId}/comments`, {
      params: { limit: limit, cursor: cursor },
    });
    console.log("댓글 목록 조회 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("댓글 목록 불러오기 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (commentId, content) => {
  try {
    // /api/comments/:commentId
    const response = await axiosInstance.patch(`/comments/${commentId}`, {
      content: content,
    });
    console.log("댓글 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(`댓글 수정 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    return null;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    // /api/comments/:commentId
    const response = await axiosInstance.delete(`/comments/${commentId}`);
    console.log("댓글 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(`댓글 삭제 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    return null;
  }
};

