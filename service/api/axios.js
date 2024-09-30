import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      //요구사항이 로컬스토리지 활용이라 SSR이 안돼서 클라이언트에서만 token 확인하는걸로 했습니다.
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    //refreshToken handle
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (typeof window !== "undefined") {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            return Promise.reject("No refresh token stored");
          }

          const response = await instance.post("/auth/refresh-token", {
            refreshToken,
          });
          const { accessToken } = response.data;

          localStorage.setItem("accessToken", accessToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return instance(originalRequest);
        }
      } catch (error) {
        console.error(
          "token refresh error:",
          error.response?.status,
          error.message
        );
        return Promise.reject({ status: error.response?.status });
      }
    }
    // response error handle
    if (error.response) {
      console.error("error.response", error.response.data);
      return Promise.reject({
        message: error.response?.data.message,
        status: error.response?.status,
      });
    }

    //request error handle
    if (error.request) {
      console.error("error.request", error.request);
      return Promise.reject({ message: error.request?.responseText });
    }

    console.error("error", error.message);

    return Promise.reject(error);
  }
);

export default instance;
