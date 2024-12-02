import axiosInstance from "./axiosInstance";
import { CommentResponse, LikeData, User } from "../types/commonTypes";
import { uploadImage } from './imageApi';

// 게시글 등록 시 필요한 데이터 타입
export interface ArticleData {
  title: string;
  content: string;
  tags: string[];
  images?: string[];
}

// 등록한 게시글 조회 시 반환되는 응답 타입
export interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  userId?: number;
  likes: LikeData[];
  comments: CommentResponse[];
  user: User;
}

// 게시글 등록
export const createArticle = async (articleData: ArticleData): Promise<ArticleResponse> => {
  console.log("게시글 등록 요청 데이터:", articleData);
  try {
    const response = await axiosInstance.post<ArticleResponse>("/articles", articleData);
    console.log("게시글 등록 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "게시글 등록 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 게시글 수정
export const updateArticle = async (articleId: number, articleData: Partial<ArticleData>): Promise<ArticleResponse> => {
  console.log("게시글 수정 요청 ID와 데이터:", articleId, articleData);
  try {
    const response = await axiosInstance.patch<ArticleResponse>(`/articles/${articleId}`, articleData);
    console.log("게시글 수정 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "게시글 수정 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 게시글 삭제
export const deleteArticle = async (articleId: number): Promise<void> => {
  console.log("게시글 삭제 요청 ID:", articleId);
  try {
    await axiosInstance.delete(`/articles/${articleId}`);
    console.log("게시글 삭제 성공");
  } catch (error: any) {
    console.error(
      "게시글 삭제 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 최신 게시글 목록 조회
export const fetchArticles = async (
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent"
): Promise<ArticleResponse[]> => {
  console.log("최신 게시글 목록 조회 요청:", { page, pageSize, keyword, orderBy });
  try {
    const response = await axiosInstance.get<ArticleResponse[]>("/articles", {
      params: { page, pageSize, keyword, orderBy },
    });
    console.log("최신 게시글 목록 조회 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("최신 게시글 목록 조회 중 오류:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 베스트 게시글 목록 조회
export const fetchBestArticles = async (page = 1, pageSize = 10): Promise<ArticleResponse[]> => {
  console.log("베스트 게시글 목록 조회 요청:", { page, pageSize });
  try {
    const response = await axiosInstance.get<ArticleResponse[]>("/articles", {
      params: { page, pageSize, orderBy: "like" },
    });
    console.log("베스트 게시글 목록 조회 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("베스트 게시글 목록 조회 중 오류:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 특정 게시글 조회
export const getArticleById = async (articleId: number): Promise<ArticleResponse> => {
  console.log("특정 게시글 조회 요청 ID:", articleId);
  try {
    const response = await axiosInstance.get<ArticleResponse>(`/articles/${articleId}`);
    console.log("특정 게시글 조회 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "특정 게시글 조회 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 게시글 좋아요
export const favoriteArticle = async (articleId: number): Promise<ArticleResponse> => {
  console.log("좋아요 추가 요청 ID:", articleId);
  try {
    const response = await axiosInstance.post<ArticleResponse>(`/articles/${articleId}/favorite`);
    console.log("좋아요 추가 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "좋아요 추가 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 게시글 좋아요 취소
export const unfavoriteArticle = async (articleId: number): Promise<ArticleResponse> => {
  console.log("좋아요 취소 요청 ID:", articleId);
  try {
    const response = await axiosInstance.delete<ArticleResponse>(`/articles/${articleId}/favorite`);
    console.log("좋아요 취소 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "좋아요 취소 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 이미지 업로드
export const uploadArticleImage = async (imageFile: File): Promise<{ imageUrl: string }> => {
  return uploadImage(imageFile);
};

