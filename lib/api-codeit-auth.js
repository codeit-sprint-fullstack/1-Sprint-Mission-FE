import { instance } from "./axios-codeit";
import { instanceWithToken } from "./axios-codeit-token";

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
      "updatedAt": "2024-07-29T05:54:31.141Z",
      "createdAt": "2024-07-29T05:54:31.141Z"
    }
  }
*/
export async function signUp({
  email,
  nickname,
  password,
  passwordConfirmation,
}) {
  const path = "/auth/signUp";
  const body = { email, nickname, password, passwordConfirmation };

  try {
    const res = await instance.post(path, body);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    return res.data.user;
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
export async function signIn({ email, password }) {
  const path = "/auth/signIn";
  const body = { email, password };

  try {
    const res = await instance.post(path, body);
    console.log("res : ", res);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    return res.data.user;
  } catch (err) {
    console.error("err : ", err);
    throw err;
  }
}

/** codeit POST /auth/refresh-token
  return accessToken : {
    "accessToken": "string"
  }
 */
export async function refreshToken() {
  const path = "/auth/refresh-token";
  const body = { refreshToken: getRefreshToken() };

  try {
    const res = await instanceWithToken.post(path, body, { _retry: true });
    setAccessToken(res.data.accessToken);
  } catch (err) {
    throw err;
  }
}
