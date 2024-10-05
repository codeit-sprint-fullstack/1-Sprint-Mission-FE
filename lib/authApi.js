import axios from "./axios";

// 회원가입 요청
export async function postSignUp(data) {
  try {
    const res = await axios.post("/auth/signUp", data);
    return res;
  } catch (error) {
    // 다시 에러를 던짐
    throw error;
  }
}

// 로그인 요청
export async function postLogIn(data) {
  try {
    const res = await axios.post("/auth/signin", data);
    return res;
  } catch (error) {
    // 에러 로그 추가
    console.log("postLogIn 에러 발생:", error);
    // 다시 에러를 던짐
    throw error;
  }
}

// token으로 user 정보 가져오기
export async function getUser() {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 accessToken 가져오기

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const res = await axios.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 토큰으로 유저 정보 요청
      },
    });
    return res.data;
  } catch (error) {
    console.error("유저 정보 요청 실패 :", error);
    throw error; // 에러를 상위에서 처리할 수 있도록 던짐
  }
}
