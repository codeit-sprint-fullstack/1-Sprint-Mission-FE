import { setCookie, getCookie, deleteCookie } from "cookies-next";

import {
  EXPIRE_TIME_ACCESS_TOKEN,
  EXPIRE_TIME_REFRESH_TOKEN,
} from "src/app/constants/token";

export function setAccessToken(accessToken: string) {
  setCookie("codeit-accessToken", accessToken, {
    path: "/",
    sameSite: "lax",
    maxAge: EXPIRE_TIME_ACCESS_TOKEN,
  });
}

export function getAccessToken(): string | null {
  return getCookie("codeit-accessToken") as string | null;
}

export function deleteAccessToken(): void {
  deleteCookie("codeit-accessToken", { path: "/" });
}

export function setRefreshToken(refreshToken: string) {
  setCookie("codeit-refresh-token", refreshToken, {
    path: "/",
    sameSite: "lax",
    maxAge: EXPIRE_TIME_REFRESH_TOKEN,
  });
}

export function getRefreshToken(): string | null {
  return getCookie("codeit-refresh-token") as string | null;
}
