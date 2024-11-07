import axios from "axios";
import * as api from "./auth";
import { GetServerSidePropsContext } from "next";
import { setCookies } from "./cookies";

let context: GetServerSidePropsContext = null;
let accessToken: string = null;
let refreshToken: string = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
  accessToken = _context.req.cookies["access-token"];
  refreshToken = _context.req.cookies["refresh-token"];
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

function parseCookies(cookies: string) {
  const parsedCookies = {};

  // 쿠키를 세미콜론으로 분리
  const cookieArray = cookies.split("; ");

  cookieArray.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    // 쿠키 이름을 키로 하고 값을 저장
    if (name && value) {
      parsedCookies[name] = decodeURIComponent(value);
    }
  });

  return parsedCookies;
}

//리퀘스트 요청전 헤더에 로컬스토리지의 저장됱 토큰을 기입한다.
instance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.cookie = "access-token=" + accessToken;
    }
    if (refreshToken && !accessToken) {
      config.headers.cookie = "refresh-token=" + refreshToken;
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
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // 여기에서 리프레시 토큰 API 호출
      try {
        const data = await api.refreshToken(); // 리프레시 토큰 함수 호출
        //서버사이드에서 실행된 경우에만 쿠키를 직접 넣어준다
        if (typeof window === "undefined") {
          const parsedCookies = parseCookies(
            data.headers["set-cookie"].join("; ")
          );
          accessToken = parsedCookies["access-token"];
          setCookies(data.headers["set-cookie"]);
        }
        return instance(originalRequest); // 원래 요청 다시 시도
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
