export async function signup(userData) {
  try {
    const response = await fetch(
      "https://panda-market-api.vercel.app/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "회원가입에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
