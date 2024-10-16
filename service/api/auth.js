import axios from "./axios";

const PATH = "/auth";

export async function createUser(data) {
  const res = await axios.post(`${PATH}/signUp`, data);
  return res.data;
}

export async function createLogIn(data) {
  const res = await axios.post(`${PATH}/logIn`, data);
  return res.data;
}
