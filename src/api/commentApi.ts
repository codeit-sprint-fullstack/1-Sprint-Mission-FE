import axiosInstance from "./axiosInstance";
import { CommentResponse } from "../types/commonTypes";

// 댓글 등록 시 필요한 데이터 타입
export interface CommentData {
  content: string;
}

// 상품에 댓글 추가
export const createProductComment = async (
  productId: number,
  content: string
): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.post<CommentResponse>(`/comments/products/${productId}/comments`, {
      content,
    });
    console.log("상품 댓글 등록 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("상품 댓글 등록 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 게시글에 댓글 추가
export const createArticleComment = async (
  articleId: number,
  content: string
): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.post<CommentResponse>(`/comments/articles/${articleId}/comments`, {
      content,
    });
    console.log("게시글 댓글 등록 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("게시글 댓글 등록 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 상품의 댓글 목록 불러오기
export const getProductComments = async (
  productId: number,
  limit = 10,
  cursor = 0
): Promise<CommentResponse[]> => {
  console.log("전달된 productId:", productId);
  if (!productId) {
    console.error("productId가 존재하지 않습니다.");
    return [];
  }

  try {
    const response = await axiosInstance.get<CommentResponse[]>(`/comments/products/${productId}/comments`, {
      params: { limit, cursor },
    });
    console.log("상품 댓글 목록 조회 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("상품 댓글 목록 불러오기 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 게시글의 댓글 목록 불러오기
export const getArticleComments = async (
  articleId: number,
  limit = 10,
  cursor = 0
): Promise<CommentResponse[]> => {
  console.log("전달된 articleId:", articleId);
  if (!articleId) {
    console.error("articleId가 존재하지 않습니다.");
    return [];
  }

  try {
    const response = await axiosInstance.get<CommentResponse[]>(`/comments/articles/${articleId}/comments`, {
      params: { limit, cursor },
    });
    console.log("게시글 댓글 목록 조회 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("게시글 댓글 목록 불러오기 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 상품 댓글 수정
export const updateProductComment = async (
  productId: number,
  commentId: number,
  content: string
): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.patch<CommentResponse>(`/comments/products/${productId}/comments/${commentId}`, {
      content,
    });
    console.log("상품 댓글 수정 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(`상품 댓글 수정 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// 게시글 댓글 수정
export const updateArticleComment = async (
  articleId: number,
  commentId: number,
  content: string
): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.patch<CommentResponse>(`/comments/articles/${articleId}/comments/${commentId}`, {
      content,
    });
    console.log("게시글 댓글 수정 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(`게시글 댓글 수정 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// 상품 댓글 삭제
export const deleteProductComment = async (
  productId: number,
  commentId: number
): Promise<void> => {
  try {
    await axiosInstance.delete(`/comments/products/${productId}/comments/${commentId}`);
    console.log("상품 댓글 삭제 성공");
  } catch (error: any) {
    console.error(`상품 댓글 삭제 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// 게시글 댓글 삭제
export const deleteArticleComment = async (
  articleId: number,
  commentId: number
): Promise<void> => {
  try {
    await axiosInstance.delete(`/comments/articles/${articleId}/comments/${commentId}`);
    console.log("게시글 댓글 삭제 성공");
  } catch (error: any) {
    console.error(`게시글 댓글 삭제 실패 (commentId: ${commentId}):`, error.response ? error.response.data : error.message);
    throw error;
  }
};

