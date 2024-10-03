import axiosInstance from "./axiosInstance";

// 현재 유저 정보 조회
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

// 유저 정보 업데이트 (이미지 변경)
export const updateUser = async (image) => {
  const response = await axiosInstance.patch("/users/me", { image: image });
  return response.data;
};

// 비밀번호 변경
export const updatePassword = async (
  currentPassword,
  password,
  passwordConfirmation
) => {
  const response = await axiosInstance.patch("/users/me/password", {
    currentPassword: currentPassword,
    password: password,
    passwordConfirmation: passwordConfirmation,
  });
  return response.data;
};

// 유저의 상품 목록 조회
export const getUserProducts = async (
  page = 1,
  pageSize = 10,
  keyword = ""
) => {
  const response = await axiosInstance.get("/users/me/products", {
    params: { page: page, pageSize: pageSize, keyword: keyword },
  });
  return response.data;
};

// 유저의 좋아요 목록 조회
export const getUserFavorites = async (
  page = 1,
  pageSize = 10,
  keyword = ""
) => {
  const response = await axiosInstance.get("/users/me/favorites", {
    params: { page: page, pageSize: pageSize, keyword: keyword },
  });
  return response.data;
};

