import axios from "axios";

import { getAccessToken, setAccessToken } from "./token-codeit";
import { refreshToken } from "./api-codeit-auth";

const axiosConfig = {
  baseURL: "https://panda-market-api.vercel.app",
  // withCredentials: true, // 수업 내용에 있어서 코드잇에서 설정해둔줄
  header: {
    "Content-Type": "application/json",
  },
};

export const instance = axios.create(axiosConfig);

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

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

    if (err.responese?.status === 401 && !originalRequest._retry) {
      await refreshToken();
      originalRequest._retry = true;
      return instance(originalRequest);
    }

    return Promise.reject(err);
  }
);
