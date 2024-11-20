export interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
    status: number;
  };
}

// 회원가입 요청 데이터 타입
export interface SignupData {
  email: string;
  password: string;
  nickname: string;
}

// 로그인 요청 데이터 타입
export interface LoginData {
  email: string;
  password: string;
}

// 로그인 및 회원가입 응답 데이터 타입
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

// 사용자 프로필 타입
export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}
