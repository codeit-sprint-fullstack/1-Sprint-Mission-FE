import axios from "axios";

export const API_BASE_URL = "https://panda-market-api.vercel.app";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
