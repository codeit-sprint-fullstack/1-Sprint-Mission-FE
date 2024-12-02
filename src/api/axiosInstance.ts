import axios, { AxiosRequestConfig, AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 전에 Authorization 헤더를 추가하는 interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const updatedConfig = config as AxiosRequestConfig; // AxiosRequestConfig 강제 변환

    if (typeof window !== "undefined") { // 클라이언트에서만 localStorage 접근
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        updatedConfig.headers = updatedConfig.headers || {}; // undefined 방지
        updatedConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return updatedConfig as any;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
