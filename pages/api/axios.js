import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // withCredentials: true,
});

// 요청 전 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("codeit-accessToken"); // 로컬스토리지에서 토큰을 가져옴
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ` + token; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const response = error.response; // 가로 챈 리스폰스
    if (response === 401 && !originalRequest._retry) {
      await instance.post("/auth/refresh-token");
      originalRequest._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
