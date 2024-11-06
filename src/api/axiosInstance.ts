import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://baomarket.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 전에 Authorization 헤더를 추가하는 interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") { // 클라이언트에서만 localStorage 접근
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

