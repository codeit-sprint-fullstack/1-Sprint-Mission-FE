import axios from "axios";

const api = axios.create({
  baseURL: "https://ms10-5yps.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function PostSignup(data) {
  try {
    const response = await api.post("/auth/signup", data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function PostLogin(data) {
  try {
    const response = await api.post("/auth/login", data);
    return response;
  } catch (error) {
    return error.response;
  }
}
// refreshToken 로그인할때, 회원가입할때 생각해야함
// 그리고 재발급 요청할때 db에 있는 refreshToken 기준으로 해야함
export async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken"); // refreshToken 가져오기
    const response = await api.post("/auth/refreshToken", { refreshToken });

    // 새로운 accessToken 저장
    localStorage.setItem("accessToken", response.data.accessToken);

    return response.data.accessToken; // 새로운 accessToken 반환
  } catch (error) {
    console.error("토큰 재발급 실패", error);
    throw error;
  }
}

export async function getProfile() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/auth/me");
    // console.log(response.data.user);
    return response.data.user;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // accessToken 만료 시 새로운 토큰 발급 시도
      try {
        await refreshAccessToken(); // 새로운 accessToken 발급
        // 새로운 토큰으로 다시 요청
        const retryResponse = await api.get("/users/me");
        return retryResponse.data;
      } catch (refreshError) {
        await refreshAccessToken();
        console.error("재시도 중 오류 발생", refreshError);
        localStorage.removeItem("accessToken");
        throw refreshError; // 토큰 갱신 실패 시 처리
      }
    } else {
      localStorage.removeItem("accessToken");
      await refreshAccessToken();
      console.error("프로필 요청 중 오류 발생", error);
      throw error;
    }
  }
}
