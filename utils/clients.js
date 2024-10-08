import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
} from "./auth";

const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp < Date.now() / 1000;
};

const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    async (config) => {
      let token = getAccessToken();
      if (token && isTokenExpired(token)) {
        try {
          const refreshToken = getRefreshToken();
          const response = await axios.post(`${baseURL}/auth/refresh-token`, {
            refreshToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          setTokens(accessToken, newRefreshToken);
          token = accessToken;
        } catch (error) {
          removeTokens();
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = getRefreshToken();
          const response = await axios.post(`${baseURL}/auth/refresh-token`, {
            refreshToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          setTokens(accessToken, newRefreshToken);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return client(originalRequest);
        } catch (refreshError) {
          removeTokens();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      if (error.response) {
        const errorMessage =
          error.response.data.message || "요청 처리 중 오류가 발생했습니다.";
        return Promise.reject(new Error(errorMessage));
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const communityApi = createApiClient(
  process.env.NEXT_PUBLIC_COMMUNITY_API_URL
);

export const productApi = createApiClient(
  process.env.NEXT_PUBLIC_PRODUCT_API_URL
);
