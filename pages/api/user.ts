import instance from "./httpClient.js";

interface User {
  id: string;
  email: string;
  nickname: string;
  createAt: Date;
  updateAt: Date;
}

export async function getUserMe(): Promise<User> {
  const res = await instance.get<User>("/users/me");
  return res.data;
}
