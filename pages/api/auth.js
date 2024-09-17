import instance from "./axios";

export async function createUser(item) {
  const res = await instance.post("/auth/signUp", item);
  return res.data;
}

export async function login(item) {
  const res = await instance.post("/auth/signIn", item);
  return res.data;
}

export async function refreshToken(item) {
  const res = await instance.post("/auth/refresh-token", item);
  return res.data;
}
