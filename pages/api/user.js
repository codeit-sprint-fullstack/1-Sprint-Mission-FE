import axios from "axios";

const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function PostSignup(data) {
  try {
    const response = await api.post("/Auth/signUp", data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function PostLogin(data) {
  try {
    const response = await api.post("/Auth/signIn", data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken"); // refreshToken 가져오기
    const response = await api.post("/auth/refresh-token", { refreshToken });

    // 새로운 accessToken 저장
    localStorage.setItem("accessToken", response.data.accessToken);

    return response.data.accessToken; // 새로운 accessToken 반환
  } catch (error) {
    console.error("토큰 재발급 실패", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
}

export async function getProfile() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // accessToken 만료 시 새로운 토큰 발급 시도
      try {
        const newAccessToken = await refreshAccessToken(); // 새로운 accessToken 발급
        // 새로운 토큰으로 다시 요청
        const retryResponse = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
        return retryResponse.data;
      } catch (refreshError) {
        console.error("재시도 중 오류 발생", refreshError);
        throw refreshError; // 토큰 갱신 실패 시 처리
      }
    } else {
      console.error("프로필 요청 중 오류 발생", error);
      throw error;
    }
  }
}
