const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const signUp = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("회원가입 요청 중 오류 발생:", error);
    throw error;
  }
};
