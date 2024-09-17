import instance from "./axios.js";

export async function getUserMe() {
  const res = await instance.get("/users/me");
  return res.data;
}
