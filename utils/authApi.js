import apiClient from "./apiClient";
import apiHandler from "./apiHandler";
import { API_ENDPOINTS } from "./apiEndpoint";

const saveAccessToken = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
};

// 로그인 API 호출
export const login = async (userData) => {
  return apiHandler(async () => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.SIGN_IN, userData);
    saveAccessToken(data.accessToken);
    return data;
  });
};

// 회원가입 API 호출
export const signup = async (userData) => {
  return apiHandler(async () => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.SIGN_UP, userData);
    saveAccessToken(data.accessToken);
    return data;
  });
};

// 유저 프로필 가져오기
export const getUserProfile = async () => {
  return apiHandler(async () => {
    const { data } = await apiClient.get(API_ENDPOINTS.USERS.ME);
    return data;
  });
};
