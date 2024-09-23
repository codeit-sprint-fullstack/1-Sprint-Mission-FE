import axios from "axios";
import apiClient from "./apiClient";

const baseUrl = "https://panda-market-api.vercel.app";

// 로그인 API 호출
export const login = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/signIn`, userData);

    // 토큰을 로컬스토리지에 저장
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (error) {
    console.error("로그인 API 에러:", error);
    throw error;
  }
};

// 회원가입 API 호출
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/signUp`, userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 API 에러:", error);
    throw error;
  }
};

// 유저 프로필 가져오기
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get("/users/me");

    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
