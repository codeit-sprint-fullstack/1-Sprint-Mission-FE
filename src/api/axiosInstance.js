import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://baomarket.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 전에 Authorization 헤더를 추가하는 interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") { // 클라이언트에서만 localStorage 접근
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
