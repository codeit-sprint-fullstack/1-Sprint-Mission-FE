const baseUrl = "https://panda-market-api.vercel.app";

export const login = async (userData) => {
  try {
    const response = await fetch(`${baseUrl}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "로그인에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("로그인 API 에러:", error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "회원가입 실패");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("회원가입 API 에러:", e);
    throw e;
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("리프레시 토큰 갱신 실패");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken); // 새로운 액세스 토큰 저장
    localStorage.setItem("refreshToken", data.refreshToken); // 새로운 리프레시 토큰 저장

    return data.accessToken;
  } catch (error) {
    console.error("리프레시 토큰 갱신 실패:", error);
    throw error;
  }
};

export const fetchWithAuth = async (url, options = {}) => {
  // localStorage에서 JWT 토큰 가져오기
  const token = localStorage.getItem("accessToken");

  // 기본 헤더에 Authorization 헤더를 추가
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`, // JWT를 'Bearer '로 포함
    "Content-Type": "application/json",
  };

  // fetch 요청에 JWT를 포함한 새 options 객체를 사용
  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

// 액세스 토큰이 필요한 API 요청
export const getUserProfile = async () => {
  try {
    const response = await fetchWithAuth(`${baseUrl}/users/me`);

    if (!response.ok) {
      throw new Error("데이터 요청 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
