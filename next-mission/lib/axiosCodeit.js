import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

const signupPost = async (subject) => {
  let res;
  try {
    res = await instance.post("/auth/signUp", subject);
    return res.data;
  } catch (e) {
    alert(e.response.data.message);
  }
};

const singinPost = async (subject) => {
  let res;
  try {
    res = await instance.post("/auth/signIn", subject);
    return res.data;
  } catch (e) {
    alert(e.response.data.message);
    throw e
  }
};

const checkTokenValidity = async (token) => {
  try {
    const res = await instance.post("/auth/signIn", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });
    return res.data.isValid; // 서버의 응답에 따라 유효성을 반환
  } catch (error) {
    console.error("토큰 검증 오류:", error);
    return false; // 유효하지 않은 경우 false 반환
  }
};

export { signupPost, singinPost, checkTokenValidity };
