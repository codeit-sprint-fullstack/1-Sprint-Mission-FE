import axios from "axios";

const baseUrl = "https://panda-market-api.vercel.app";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가 (Authorization 헤더 자동 추가)
apiClient.interceptors.request.use(
  (config) => {
    // 클라이언트에서만 localStorage를 사용할 수 있도록 조건 추가
    if (typeof window !== "undefined") {
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

// 응답 인터셉터 추가 (401 Unauthorized 처리)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 오류 발생 시, 리프레시 토큰을 사용해 토큰 갱신
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        if (typeof window !== "undefined") {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch (err) {
        console.error("토큰 갱신 실패", err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// 토큰 갱신 함수
async function refreshToken() {
  try {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null;
    if (!refreshToken) throw new Error("리프레시 토큰이 없습니다.");

    const response = await axios.post(`${baseUrl}/auth/refresh-token`, {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // 갱신된 토큰 저장 (클라이언트에서만)
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    }

    return accessToken;
  } catch (error) {
    console.error("리프레시 토큰 갱신 실패:", error);
    throw error;
  }
}

export default apiClient;
