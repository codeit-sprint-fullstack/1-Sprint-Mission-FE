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

export async function getProfile() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response;
  }
}
