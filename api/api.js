// api.js
import axiosInstance from "../lib/axios";

// 사용자 정보 가져오기
export const fetchCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

// 상품 목록 가져오기
export const fetchProducts = async (params) => {
  const response = await axiosInstance.get("/products", { params });
  return response.data;
};

// 상품 상세 정보 가져오기
export const fetchProductById = async (productId) => {
  const response = await axiosInstance.get(`/products/${productId}`);
  return response.data;
};

// 상품 댓글 목록 가져오기
export const fetchProductComments = async (productId, params) => {
  const response = await axiosInstance.get(`/products/${productId}/comments`, {
    params,
  });
  return response.data;
};

// 상품 댓글 작성
export const postProductComment = async ({ productId, content }) => {
  const response = await axiosInstance.post(`/products/${productId}/comments`, {
    content,
  });
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  const response = await axiosInstance.delete(`/comments/${commentId}`);
  return response.data;
};

// 상품 좋아요 추가
export const postProductFavorite = async (productId) => {
  const response = await axiosInstance.post(`/products/${productId}/favorite`);
  return response.data;
};

// 상품 좋아요 취소
export const deleteProductFavorite = async (productId) => {
  const response = await axiosInstance.delete(
    `/products/${productId}/favorite`
  );
  return response.data;
};

// 회원가입 요청
export const signUp = async (userData) => {
  const response = await axiosInstance.post("/auth/signUp", userData);
  return response.data;
};

// 로그인 요청
export const logIn = async (userData) => {
  const response = await axiosInstance.post("/auth/signIn", userData);
  return response.data;
};
