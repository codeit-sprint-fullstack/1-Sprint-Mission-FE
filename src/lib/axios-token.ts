import axios, { AxiosInstance } from "axios";

import { getAccessToken } from "./token-codeit";
import { refreshToken } from "./api-codeit-auth";

const axiosConfig = {
  baseURL: process.env.NEXT_SPRINT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const instance: AxiosInstance = axios.create(axiosConfig);

instance.interceptors.request.use(
  (config) => {
    const token: string | null = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();

        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);
