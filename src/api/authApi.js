import axios from "axios";
import axiosInstance from "./axiosInstance";

const baseUrl = "https://baomarket.onrender.com/api";

// 회원가입 요청
export const signUp = async (email, nickname, password, passwordConfirmation) => {
  try {
    const response = await axios({
      method: "post",
      url: `${baseUrl}/auth/signUp`,
      data: {
        email,
        nickname,
        password,
        passwordConfirmation,
      },
    });

    console.log("회원가입 응답:", response.data);

    // 회원가입 후 accessToken 및 nickname 저장
    if (response.data.accessToken && response.data.nickname) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("nickname", response.data.nickname);
      console.log("닉네임 저장 완료:", response.data.nickname);
    } else {
      console.error("회원가입 응답에 nickname이 없습니다.");
    }
    return response.data;
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    throw error;
  }
};

// 로그인 요청
export const signIn = async (email, password) => {
  try {
    const response = await axios({
      method: "post",
      url: `${baseUrl}/auth/signIn`,
      data: {
        email,
        password,
      },
    });

    console.log("로그인 응답:", response.data);

    // 로그인 후 accessToken 및 user 정보를 저장
    if (response.data.accessToken && response.data.user) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("nickname", response.data.user.nickname);
      localStorage.setItem("userId", response.data.user.id);
      console.log("닉네임 저장 완료:", response.data.user.nickname);
      console.log("사용자 ID 저장 완료:", response.data.user.id);
      console.log("저장된 accessToken: ", response.data.accessToken);

      window.dispatchEvent(new Event("storage"));
    } else {
      console.error("로그인 응답에 닉네임 또는 userId가 없습니다.");
    }

    return response.data;
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    throw error;
  }
};

// 로그아웃
export const logOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("nickname");
  localStorage.removeItem("userId");
  console.log("로그아웃 완료, accessToken 및 nickname 제거");
};

// accessToken 가져오기
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

