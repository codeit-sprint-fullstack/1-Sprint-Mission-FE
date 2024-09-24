import apiClient from "./apiClient";
import apiHandler from "./apiHandler";

// 토큰을 로컬스토리지에 저장하는 함수
const saveAccessToken = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
};

// 로그인 API 호출
export const login = async (userData) => {
  return apiHandler(async () => {
    const { data } = await apiClient.post("/auth/signIn", userData);
    saveAccessToken(data.accessToken); // 토큰 저장
    return data;
  });
};

// 회원가입 API 호출
export const signup = async (userData) => {
  return apiHandler(async () => {
    const { data } = await apiClient.post("/auth/signUp", userData);
    saveAccessToken(data.accessToken); // 토큰 저장
    return data;
  });
};

// 유저 프로필 가져오기
export const getUserProfile = async () => {
  return apiHandler(async () => {
    const { data } = await apiClient.get("/users/me");
    return data;
  });
};
