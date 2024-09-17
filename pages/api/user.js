import instance from "./axios.js";

export async function getUser() {}

export async function getUsers() {}

export async function updateUser(id) {}

export async function createUser(items) {
  const res = await instance.post("/auth/signUp", items);
  return res.data;
}

export async function deleteUser(id) {}
