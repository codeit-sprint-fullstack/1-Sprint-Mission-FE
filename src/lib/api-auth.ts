import { AxiosRequestConfig } from "axios";

import { instance } from "./axios-token";

import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./token-codeit";

/** codeit POST /auth/signUp 
  return user : {
    "accessToken": "accessToken",
    "refreshToken": "refreshToken",
    "user": {
      "id": 123,
      "email": "example@email.com",
      "image": null,
      "nickname": "example",
      "createdAt": "2024-07-29T05:54:31.141Z"
    }
  }
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
  return user : {
    "accessToken": "accessToken",
    "refreshToken": "refresh",
    "user": {
      "id": 123,
      "email": "example@email.com",
      "image": null,
      "nickname": "example",
      "updatedAt": "2024-07-29T05:54:31.143Z",
      "createdAt": "2024-07-29T05:54:31.143Z"
    }
  }
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
    setRefreshToken(res.data?.refreshToken);

    return res.data;
  } catch (err) {
    throw err;
  }
}

/** codeit POST /auth/refresh-token
  return accessToken : {
    "accessToken": "string"
  }
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
