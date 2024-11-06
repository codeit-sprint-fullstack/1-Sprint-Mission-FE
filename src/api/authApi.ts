import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : `${process.env.NEXT_PUBLIC_API_URL_DEV}/api`;

interface AuthResponse {
  accessToken: string;
  nickname: string;
}

// 회원가입 요청
export const signUp = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${baseUrl}/auth/signUp`, {
      email,
      nickname,
      password,
      passwordConfirmation,
    });

    console.log("회원가입 응답:", response.data);

    if (response.data.accessToken && response.data.nickname) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("nickname", response.data.nickname);
      console.log("닉네임 저장 완료:", response.data.nickname);
    } else {
      console.error("회원가입 응답에 nickname이 없습니다.");
    }

    return response.data;
  } catch (error: any) {
    console.error("회원가입 중 오류 발생:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 로그인 요청
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${baseUrl}/auth/signIn`, {
      email,
      password,
    });

    console.log("로그인 응답:", response.data);

    if (response.data.accessToken && response.data.nickname) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("nickname", response.data.nickname);
      console.log("닉네임 저장 완료:", response.data.nickname);
      console.log("저장된 accessToken: ", response.data.accessToken);

      window.dispatchEvent(new Event("storage"));
    } else {
      console.error("로그인 응답에 닉네임 또는 accessToken이 없습니다.");
    }

    return response.data;
  } catch (error: any) {
    console.error("로그인 중 오류 발생:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// 로그아웃
export const logOut = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("nickname");
  console.log("로그아웃 완료, accessToken 및 nickname 제거");
};

// accessToken 가져오기
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

