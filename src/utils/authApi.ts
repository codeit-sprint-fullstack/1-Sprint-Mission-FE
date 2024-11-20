import apiClient from "./apiClient";
import apiHandler from "./apiHandler";
import { API_ENDPOINTS } from "./apiEndpoint";
import { UserProfile, UserCredentials, AuthResponse } from "@/types/Types";

// 액세스 토큰과 리프레시 토큰 저장
const saveAccessToken = (accessToken: string, refreshToken: string) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

// 로그인 함수
export const login = async (
  userData: UserCredentials
): Promise<AuthResponse> => {
  return apiHandler(async () => {
    const { data } = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGN_IN,
      userData
    );
    saveAccessToken(data.accessToken, data.refreshToken);
    return data;
  });
};

// 회원가입 함수
export const signup = async (
  userData: UserCredentials
): Promise<AuthResponse> => {
  return apiHandler(async () => {
    const { data } = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGN_UP,
      userData
    );
    saveAccessToken(data.accessToken, data.refreshToken);
    return data;
  });
};

// 리프레시 토큰을 사용하여 액세스 토큰 갱신
export async function refreshToken(): Promise<string | null> {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const { data } = await apiClient.post<{ accessToken: string }>(
      API_ENDPOINTS.AUTH.REFRESH,
      {
        refreshToken,
      }
    );
    saveAccessToken(data.accessToken, refreshToken);
    return data.accessToken;
  } catch (err) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
}

// 사용자 프로필 가져오기
export const getUserProfile = async (): Promise<UserProfile> => {
  return apiHandler(async () => {
    const { data } = await apiClient.get<UserProfile>(API_ENDPOINTS.USERS.ME);
    return data;
  });
};
