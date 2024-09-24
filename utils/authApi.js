import axios from "axios";
import apiClient from "./apiClient";
import apiHandler from "./apiHandler";

const baseUrl = "https://panda-market-api.vercel.app";

// 로그인 API 호출
export const login = async (userData) => {
  return apiHandler(async () => {
    const response = await axios.post(`${baseUrl}/auth/signIn`, userData);

    // 토큰을 로컬스토리지에 저장
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    return response.data;
  });
};

// 회원가입 API 호출
export const signup = async (userData) => {
  return apiHandler(async () => {
    const response = await axios.post(`${baseUrl}/auth/signUp`, userData);
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return response.data;
  });
};

// 유저 프로필 가져오기
export const getUserProfile = async () => {
  return apiHandler(async () => {
    const response = await apiClient.get("/users/me");
    return response.data;
  });
};
