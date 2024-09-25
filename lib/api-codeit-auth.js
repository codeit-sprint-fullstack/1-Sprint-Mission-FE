import { instance } from "./axios-codeit";

import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./token-codeit";

/** codeit POST /auth/signUp return userData */
export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  const path = "/auth/signUp";
  const body = { email, nickname, password, passwordConfirmation };

  // {
  //   "accessToken": "accessToken",
  //   "refreshToken": "refreshToken",
  //   "user": {
  //     "id": 123,
  //     "email": "example@email.com",
  //     "image": null,
  //     "nickname": "example",
  //     "updatedAt": "2024-07-29T05:54:31.141Z",
  //     "createdAt": "2024-07-29T05:54:31.141Z"
  //   }
  // }

  try {
    const res = await instance.post(path, body);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    return res.data.user;
  } catch (err) {
    throw err;
  }
}

/** codeit POST /auth/signIn return userData */
export async function signIn({ email, password }) {
  const path = "/auth/signIn";
  const body = { email, password };

  // {
  //   "accessToken": "accessToken",
  //   "refreshToken": "refresh",
  //   "user": {
  //     "id": 123,
  //     "email": "example@email.com",
  //     "image": null,
  //     "nickname": "example",
  //     "updatedAt": "2024-07-29T05:54:31.143Z",
  //     "createdAt": "2024-07-29T05:54:31.143Z"
  //   }
  // }

  try {
    const res = await instance.post(path, body);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    return res.data.user;
  } catch (err) {
    throw err;
  }
}

/** codeit POST /auth/refresh-token */
export async function refreshToken() {
  const path = "/auth/refresh-token";
  const body = { refreshToken: getRefreshToken() };

  // {
  //   "accessToken": "string"
  // }

  try {
    const res = await instance.post(path, body, { _retry: true });
    setAccessToken(res.data.accessToken);
  } catch (err) {
    throw err;
  }
}
