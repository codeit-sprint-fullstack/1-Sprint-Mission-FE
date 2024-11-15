import axios, { AxiosInstance } from "axios";

import {
  setAccessToken,
  getAccessToken,
  getRefreshToken,
} from "./token-codeit";

const baseURL = process.env.NEXT_PUBLIC_SPRINT_BASE_URL || "";

// Axios 인스턴스 생성
export const createAxiosInstance = (req?: any): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken(req); // SSR에서는 req로 읽음
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = getRefreshToken(req);
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        try {
          const refreshResponse = await axios.post(
            `${baseURL}/auth/refresh`,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          const newAccessToken = refreshResponse.data.accessToken;
          setAccessToken(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          throw refreshError;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
