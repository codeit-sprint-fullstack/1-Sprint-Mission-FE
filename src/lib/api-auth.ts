import { AxiosRequestConfig } from "axios";

import { instance } from "./axios-token";

import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./token-codeit";

/** codeit POST /auth/signUp
 */
export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}) {
  const path = "/auth/sign-up";
  // 이름 관련 UI 추가 예정
  const body = {
    email,
    nickname,
    password,
    passwordConfirmation,
    name: "임시이름",
  };

  try {
    const res = await instance.post(path, body);

    console.log("signUp res : ", res);

    return res.data;
  } catch (err) {
    throw err;
  }
}

/** codeit POST /auth/signIn
 */
export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const path = "/auth/sign-in";
  const body = { email, password };

  try {
    const res = await instance.post(path, body);

    setAccessToken(res.data?.accessToken);
    console.log("export async function signIn :", res.data?.accessToken);
    setRefreshToken(res.data?.refreshToken);

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/** codeit POST /auth/refresh-token
 */
export async function refreshToken(): Promise<void> {
  const path = "/auth/refresh-token";
  const body = { refreshToken: getRefreshToken() };

  try {
    const res = await instance.post(path, body, {
      _retry: true,
    } as AxiosRequestConfig);
    setAccessToken(res.data.accessToken);
  } catch (err) {
    throw err;
  }
}
