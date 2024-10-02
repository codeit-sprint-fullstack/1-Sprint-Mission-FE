import apiClient from "./apiClient";
import apiHandler from "./apiHandler";
import { API_ENDPOINTS } from "./apiEndpoint";

const saveAccessToken = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const login = async (userData) => {
  return apiHandler(async () => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.SIGN_IN, userData);
    saveAccessToken(data.accessToken, data.refreshToken);
    return data;
  });
};

export const signup = async (userData) => {
  return apiHandler(async () => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.SIGN_UP, userData);
    saveAccessToken(data.accessToken, data.refreshToken);
    return data;
  });
};

export async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
    saveAccessToken(data.accessToken, refreshToken);
    return data.accessToken;
  } catch (err) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export const getUserProfile = async () => {
  return apiHandler(async () => {
    const { data } = await apiClient.get(API_ENDPOINTS.USERS.ME);
    return data;
  });
};
