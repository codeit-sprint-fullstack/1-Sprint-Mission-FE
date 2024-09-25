import axios from "./axios";

const ENDPOINT = "/auth";

export async function createUser(data) {
  const res = await axios.post(`${ENDPOINT}/signUp`, data);
  return res.data;
}

export async function createLogIn(data) {
  const res = await axios.post(`${ENDPOINT}/signIp`, data);
  return res.data;
}
