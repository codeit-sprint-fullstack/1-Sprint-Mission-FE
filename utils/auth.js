import { Cookies } from "react-cookie";
import { productApi } from "./clients";
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from "@/errors/CustomExceptions";

const cookies = new Cookies();

const TOKEN_CONFIG = {
  path: "/",
  secure: true,
  sameSite: "strict",
};

export const setTokens = (accessToken, refreshToken) => {
  cookies.set("accessToken", accessToken, TOKEN_CONFIG);
  cookies.set("refreshToken", refreshToken, TOKEN_CONFIG);
};

export const getAccessToken = () => cookies.get("accessToken");
export const getRefreshToken = () => cookies.get("refreshToken");

export const removeTokens = () => {
  cookies.remove("accessToken", TOKEN_CONFIG);
  cookies.remove("refreshToken", TOKEN_CONFIG);
  localStorage.removeItem("userInfo");
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp < Date.now() / 1000;
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  return token && !isTokenExpired(token);
};

export const signUp = async (
  email,
  nickname,
  password,
  passwordConfirmation
) => {
  try {
    const response = await productApi.post("/auth/signUp", {
      email,
      nickname,
      password,
      passwordConfirmation,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new BadRequestException("유효하지 않은 회원가입 정보입니다.");
        case 409:
          throw new ConflictException(
            "이미 존재하는 이메일 또는 닉네임입니다."
          );
        default:
          throw new Error("회원가입 중 오류가 발생했습니다.");
      }
    }
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await productApi.post("/auth/signIn", { email, password });
    setTokens(response.data.accessToken, response.data.refreshToken);
    setUserInfo(response.data.user);
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new BadRequestException(
            "이메일 또는 비밀번호가 올바르지 않습니다."
          );
        case 401:
          throw new UnauthorizedException("인증에 실패했습니다.");
        default:
          throw new Error("로그인 중 오류가 발생했습니다.");
      }
    }
    throw error;
  }
};

export const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new UnauthorizedException("리프레시 토큰이 없습니다.");
  }

  try {
    const response = await productApi.post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });

    if (
      !response.data ||
      !response.data.accessToken ||
      !response.data.refreshToken
    ) {
      throw new Error("토큰 갱신 응답이 올바르지 않습니다.");
    }

    setTokens(response.data.accessToken, response.data.refreshToken);
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new BadRequestException("올바르지 않은 리프레시 토큰입니다.");
        case 401:
          throw new UnauthorizedException("리프레시 토큰이 만료되었습니다.");
        default:
          throw new Error("토큰 갱신 중 오류가 발생했습니다.");
      }
    }
    throw error;
  }
};

export const getUserInfo = () => {
  const userInfoString = localStorage.getItem("userInfo");
  if (!userInfoString) {
    throw new NotFoundException("사용자 정보를 찾을 수 없습니다.");
  }
  return JSON.parse(userInfoString);
};

export const setUserInfo = (userInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const logout = () => {
  removeTokens();
  window.location.href = "/login";
};
