import { createAxiosInstance } from "./axios-token";
import { getAccessToken } from "./token-codeit";

export async function getMyInfo(userId: string) {
  const path = `/user/${userId}`;
  const headers = { authorization: `Bearer ${getAccessToken()}` };
  const instance = createAxiosInstance();

  try {
    const res = await instance.get(path, { headers });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function setMyInfo({
  userId,
  nickname,
  image,
  password,
}: {
  userId: string;
  nickname?: string;
  image?: string;
  password?: string;
}) {
  const path = `/user/${userId}`;
  const data = {
    nickname,
    image,
    password,
  };
  const headers = { authorization: `Bearer ${getAccessToken()}` };
  const instance = createAxiosInstance();

  try {
    const res = await instance.patch(path, data, { headers });
    return res.data;
  } catch (err) {
    throw err;
  }
}
