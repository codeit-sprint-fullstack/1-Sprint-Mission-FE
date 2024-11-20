import axiosInstance from "./axiosInstance";
import { LikeData } from "../types/commonTypes";
import { ProductResponse } from "./productApi";

// 유저 정보 조회 시 반환되는 데이터 타입
export interface UserData {
  id: number;
  nickname: string;
  email: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  products: ProductResponse[];
  likes: LikeData[];
}

// 비밀번호 변경 시 필요한 데이터 타입
export interface UpdatePasswordData {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
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


