import { API_BASE_URL } from "../../lib/axios";

export const signUp = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("서버 응답:", data);
      throw new Error(data.message || "회원가입 실패");
    }

    return data;
  } catch (error) {
    console.error("회원가입 요청 중 오류 발생:", error);
    throw error;
  }
};

export const logIn = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("로그인 요청 중 오류 발생:", error);
    throw error;
  }
};
