import { parse, serialize } from "cookie";

import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "src/app/constants/token";

export async function getAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value || null;
  } else {
    const cookies = parse(document.cookie);
    return cookies[ACCESS_TOKEN_COOKIE_KEY] || null;
  }
}

export async function setAccessToken(value: string): Promise<void> {
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const response = await headers();
    response.set(
      "Set-Cookie",
      serialize(ACCESS_TOKEN_COOKIE_KEY, value, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: ACCESS_TOKEN_MAX_AGE,
      })
    );
  } else {
    document.cookie = serialize(ACCESS_TOKEN_COOKIE_KEY, value, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
  }
}

export async function deleteAccessToken(): Promise<void> {
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const response = await headers();
    response.set(
      "Set-Cookie",
      serialize(ACCESS_TOKEN_COOKIE_KEY, "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
      })
    );
  } else {
    document.cookie = serialize(ACCESS_TOKEN_COOKIE_KEY, "", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
    });
  }
}

export async function getRefreshToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value || null;
  } else {
    const cookies = parse(document.cookie);
    return cookies[REFRESH_TOKEN_COOKIE_KEY] || null;
  }
}

export async function setRefreshToken(value: string): Promise<void> {
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const response = await headers();
    response.set(
      "Set-Cookie",
      serialize(REFRESH_TOKEN_COOKIE_KEY, value, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: REFRESH_TOKEN_MAX_AGE,
      })
    );
  } else {
    document.cookie = serialize(REFRESH_TOKEN_COOKIE_KEY, value, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
  }
}

export async function deleteRefreshToken(): Promise<void> {
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");
    const response = await headers();
    response.set(
      "Set-Cookie",
      serialize(REFRESH_TOKEN_COOKIE_KEY, "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
      })
    );
  } else {
    document.cookie = serialize(REFRESH_TOKEN_COOKIE_KEY, "", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
    });
  }
}
