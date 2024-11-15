import { parse, serialize } from "cookie";

const ACCESS_TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";

export function getCookie(name: string, req?: any): string | null {
  if (typeof window !== "undefined") {
    const cookies = parse(document.cookie);
    return cookies[name] || null;
  }

  if (req?.headers?.cookie) {
    const cookies = parse(req.headers.cookie);
    return cookies[name] || null;
  }

  return null;
}

export function setCookie(
  name: string,
  value: string,
  options: { maxAge?: number; path?: string; httpOnly?: boolean } = {}
): void {
  const cookie = serialize(name, value, {
    path: "/",
    maxAge: options.maxAge || 3600,
    httpOnly: options.httpOnly || false,
    secure: process.env.NODE_ENV === "production",
    ...options,
  });

  if (typeof window !== "undefined") {
    document.cookie = cookie;
  } else {
    throw new Error("setCookie can only be used on the client side.");
  }
}

export function deleteCookie(name: string): void {
  setCookie(name, "", { maxAge: -1 });
}

export function getAccessToken(req?: any): string | null {
  return getCookie(ACCESS_TOKEN_KEY, req);
}

export function setAccessToken(value: string): void {
  setCookie(ACCESS_TOKEN_KEY, value, { maxAge: 3600 });
}

export function deleteAccessToken(): void {
  deleteCookie(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(req?: any): string | null {
  return getCookie(REFRESH_TOKEN_KEY, req);
}

export function setRefreshToken(value: string): void {
  setCookie(REFRESH_TOKEN_KEY, value, { maxAge: 3600 });
}

export function deleteRefreshToken(): void {
  deleteCookie(REFRESH_TOKEN_KEY);
}
