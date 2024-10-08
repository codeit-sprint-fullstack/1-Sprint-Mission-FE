import instance from "./httpClient";

export async function getUserMe() {
  const res = await instance.get("/users/me");
  return res.data;
}

export async function createUser(item) {
  const res = await instance.post("/users/signup", item);
  return res.data;
}

export async function login(item) {
  const res = await instance.post("/users/login", item);
  return res.data;
}

export async function refreshToken() {
  const res = await instance.get("/users/refresh-token");
  return res.data;
}
