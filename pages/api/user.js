import axios from "axios";

const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function postsignup(data) {
  try {
    const response = await api.post("/Auth/signUp", { params: data });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function postlogin(data) {
  try {
    const response = await api.post("/Auth/signIn", { params: data });
    return response;
  } catch (error) {
    return error.response;
  }
}
