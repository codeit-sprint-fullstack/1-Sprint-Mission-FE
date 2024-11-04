import instance from "./httpClient";

interface User {
  id?: string;
  email: string;
  password: string;
  nickname: string;
  createAt: Date;
  updateAt: Date;
}

export async function getUserMe(): Promise<User> {
  const res = await instance.get("/users/me");
  return res.data;
}

export async function createUser(item: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await instance.post<User>("/users/signup", item);
  return res.data;
}

export async function login(item: {
  email: string;
  password: string;
}): Promise<User> {
  const res = await instance.post("/users/login", item);
  return res.data;
}

export async function refreshToken(): Promise<User> {
  const res = await instance.get<User>("/users/refresh-token");
  return res.data;
}
