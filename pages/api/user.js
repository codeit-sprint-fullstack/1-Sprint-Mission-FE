import axios from "axios";

const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function PostSignup(data) {
  try {
    const response = await api.post("/Auth/signUp", data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function PostLogin(data) {
  try {
    const response = await api.post("/Auth/signIn", data);
    return response;
  } catch (error) {
    return error.response;
  }
}
