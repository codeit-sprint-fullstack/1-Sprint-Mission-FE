import axiosInstance from "./axiosInstance";

// 상품에 댓글 추가
export const createProductComment = async (productId, content) => {
  try {
    // 상품에 댓글 등록
    const response = await axiosInstance.post(`/comments/products/${productId}/comments`, {
      content: content,
    });
    console.log("상품 댓글 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("상품 댓글 등록 실패:", error.response ? error.response.data : error.message);
    return null;
  }
};

// 게시글에 댓글 추가
export const createArticleComment = async (articleId, content) => {
  try {
    // 게시글에 댓글 등록
    const response = await axiosInstance.post(`/comments/articles/${articleId}/comments`, {
      content: content,
    });
    console.log("게시글 댓글 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 댓글 등록 실패:", error.response ? error.response.data : error.message);
    return null;
  }
};

// 상품의 댓글 목록 불러오기
export const getProductComments = async (productId, limit = 10, cursor = 0) => {
  console.log("전달된 productId:", productId);
  if (!productId) {
    console.error("productId가 존재하지 않습니다.");
    return [];
  }

  try {
    // 상품의 댓글 목록 조회
    const response = await axiosInstance.get(`/comments/products/${productId}/comments`, {
      params: { limit: limit, cursor: cursor },
    });
    console.log("상품 댓글 목록 조회 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("상품 댓글 목록 불러오기 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 게시글의 댓글 목록 불러오기
export const getArticleComments = async (articleId, limit = 10, cursor = 0) => {
  console.log("전달된 articleId:", articleId);
  if (!articleId) {
    console.error("articleId가 존재하지 않습니다.");
    return [];
  }

  try {
    // 게시글의 댓글 목록 조회
    const response = await axiosInstance.get(`/comments/articles/${articleId}/comments`, {
      params: { limit: limit, cursor: cursor },
    });
    console.log("게시글 댓글 목록 조회 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 댓글 목록 불러오기 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 상품 댓글 수정
export const updateProductComment = async (productId, commentId, content) => {
  try {
    const response = await axiosInstance.patch(`/comments/products/${productId}/comments/${commentId}`, {
      content: content,
    });
    console.log("상품 댓글 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(`상품 댓글 수정 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// 게시글 댓글 수정
export const updateArticleComment = async (articleId, commentId, content) => {
  try {
    const response = await axiosInstance.patch(`/comments/articles/${articleId}/comments/${commentId}`, {
      content: content,
    });
    console.log("게시글 댓글 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(`게시글 댓글 수정 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// 상품 댓글 삭제
export const deleteProductComment = async (productId, commentId) => {
  try {
    // 상품 댓글 삭제
    const response = await axiosInstance.delete(`/comments/products/${productId}/comments/${commentId}`);
    console.log("상품 댓글 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(`상품 댓글 삭제 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    return null;
  }
};

// 게시글 댓글 삭제
export const deleteArticleComment = async (articleId, commentId) => {
  try {
    // 게시글 댓글 삭제
    const response = await axiosInstance.delete(`/comments/articles/${articleId}/comments/${commentId}`);
    console.log("게시글 댓글 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(`게시글 댓글 삭제 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    return null;
  }
};
