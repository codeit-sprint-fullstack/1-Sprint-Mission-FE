import axios from "./axios";

const ENDPOINT = "/auth";

export async function createUser(data) {
  try {
    const res = await axios.post(`${ENDPOINT}/signUp`, data);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}

export async function createLogIn(data) {
  try {
    const res = await axios.post(`${ENDPOINT}/signIp`, data);
    return res.data;
  } catch (error) {
    console.error("Api error", error.message, error?.status);
  }
}
