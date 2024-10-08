import axios from "axios";
import * as api from "./auth";
import Cookies from "js-cookie";

let context = null;
let accessToken = null;
let refreshToken = null;
export const setContext = (_context) => {
  context = _context;
  accessToken = _context.req.cookies["access-token"];
  refreshToken = _context.req.cookies["refresh-token"];
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

//리퀘스트 요청전 헤더에 로컬스토리지의 저장됱 토큰을 기입한다.
instance.interceptors.request.use(
  (config) => {
    //서버사이드의 리퀘스트라면 토큰을 추가하지 않는다.
    // if (typeof window !== "undefined") {
    //   const token = localStorage.getItem("codeit-accessToken"); // 로컬스토리지에서 토큰을 가져옴
    //   if (token) {
    //     config.headers["Authorization"] = `Bearer ` + token; // Authorization 헤더에 토큰 추가
    //   }
    // }
    // console.log("in axios request interceptor " + accessToken);
    // console.log(
    //   "in axios request interceptor refresh token " + (refreshToken && "true")
    // );
    // console.log("리퀘스트 패스 " + config.url);
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    if (refreshToken) {
      config.headers["refreshToken"] = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 리스폰스로 권한 에러가 돌아오면 토큰을 갱신한다
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log(error.message);
    const originalRequest = error.config;
    const response = error.response.status; // 가로 챈 리스폰스
    if (response === 401 && !originalRequest._retry) {
      await api.refreshToken();
      originalRequest._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
