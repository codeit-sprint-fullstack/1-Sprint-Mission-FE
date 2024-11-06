import axiosInstance from "./axiosInstance";

interface UserData {
  id: number;
  nickname: string;
  email: string;
  image?: string;
}

interface UpdatePasswordData {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// 현재 유저 정보 조회
export const getCurrentUser = async (): Promise<UserData> => {
  const response = await axiosInstance.get<UserData>("/users/me");
  return response.data;
};

// 유저 정보 업데이트 (이미지 변경)
export const updateUser = async (image: string): Promise<UserData> => {
  const response = await axiosInstance.patch<UserData>("/users/me", { image });
  return response.data;
};

// 비밀번호 변경
export const updatePassword = async (passwordData: UpdatePasswordData): Promise<void> => {
  await axiosInstance.patch("/users/me/password", passwordData);
};

// 유저의 상품 목록 조회
export const getUserProducts = async (
  page = 1,
  pageSize = 10,
  keyword = ""
): Promise<ProductData[]> => {
  const response = await axiosInstance.get<ProductData[]>("/users/me/products", {
    params: { page, pageSize, keyword },
  });
  return response.data;
};

// 유저의 좋아요 목록 조회
export const getUserFavorites = async (
  page = 1,
  pageSize = 10,
  keyword = ""
): Promise<ProductData[]> => {
  const response = await axiosInstance.get<ProductData[]>("/users/me/favorites", {
    params: { page, pageSize, keyword },
  });
  return response.data;
};

