import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  SignupData,
  LoginData,
  AuthResponse,
  UserProfile,
  ErrorResponse,
} from './types/authTypes';

const api = axios.create({
  baseURL: 'https://ms10-5yps.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 회원가입 요청
export async function PostSignup(
  data: SignupData
): Promise<AxiosResponse<AuthResponse> | ErrorResponse> {
  try {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response;
  } catch (error) {
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

// 로그인 요청
export async function PostLogin(
  data: LoginData
): Promise<AxiosResponse<AuthResponse> | ErrorResponse> {
  try {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response;
  } catch (error) {
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

// 액세스 토큰 재발급 요청
export async function refreshAccessToken(): Promise<string | ErrorResponse> {
  try {
    const refreshToken = localStorage.getItem('refreshToken'); // refreshToken 가져오기
    const response = await api.post<AuthResponse>('/auth/refreshToken', {
      refreshToken,
    });

    localStorage.setItem('accessToken', response.data.accessToken);

    return response.data.accessToken;
  } catch (error) {
    console.error('토큰 재발급 실패', error);
    return (
      (error as AxiosError<ErrorResponse>).response?.data || {
        response: undefined,
      }
    );
  }
}

// 사용자 프로필 정보 요청
export async function getProfile(): Promise<UserProfile | ErrorResponse> {
  try {
    const response = await api.get<{ user: UserProfile }>('/auth/me');
    return response.data.user;
  } catch (error) {
    if ((error as AxiosError<ErrorResponse>).response?.status === 401) {
      // accessToken 만료 시 새로운 토큰 발급 시도
      try {
        await refreshAccessToken(); // 새로운 accessToken 발급
        const retryResponse = await api.get<{ user: UserProfile }>('/auth/me');
        return retryResponse.data.user;
      } catch (refreshError) {
        console.error('재시도 중 오류 발생', refreshError);
        localStorage.removeItem('accessToken');
        return (
          (refreshError as AxiosError<ErrorResponse>).response?.data || {
            response: undefined,
          }
        );
      }
    } else {
      localStorage.removeItem('accessToken');
      return (
        (error as AxiosError<ErrorResponse>).response?.data || {
          response: undefined,
        }
      );
    }
  }
}
