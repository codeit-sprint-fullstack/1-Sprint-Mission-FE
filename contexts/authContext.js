import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "@/pages/api/auth";
import * as userApi from "@/pages/api/user";
import { useRouter } from "next/router";

const AuthContext = createContext({
  user: null,
  isPending: false,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const getMe = async () => {
    //사용자정보의 유무의 따라 리다이렉트를 하기위한 pending 상태추가
    setIsPending(true);
    try {
      const data = await userApi.getUserMe();
      if (data) {
        //새로운 사용자정보가 있으면 갱신
        setUser(data);
      }
    } catch (error) {
      console.log(error);
      //에러 발생시 사용자정보 초기화 -> 토큰만료 등
      setUser(null);
    } finally {
      //pending 상태는 false로 초기화
      setIsPending(false);
    }
  };

  const login = async (loginValue) => {
    const data = await authApi.login(loginValue);
    if (data) {
      //받아온 정보가 있다면 아래의 이름의 로컬스토리지로 저장
      localStorage.setItem("codeit-accessToken", data.accessToken);
      localStorage.setItem("codeit-refreshToken", data.refreshToken);
      //사용자정보 갱신
      getMe();
    }
  };

  const logout = () => {};

  const updateMe = () => {};

  useEffect(() => {
    const token = localStorage.getItem("codeit-accessToken");
    //로컬스토리지에 해당 토큰이 있을때만 사용자정보를 가지고온다.
    if (token) {
      getMe();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isPending, login, logout, updateMe, getMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth(required = true) {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("콘텍스트 프로바이더가 없습니다.");
  }

  useEffect(() => {
    //렌더링 완료후 required가 참이면서 사용자정보가 없고, 대기상태가 아니라면 로그인페이지로 리다이렉트
    if (required && !context.user && !context.isPending) {
      router.push("/Login");
    }
  }, [required, context.user, router]);

  return context;
}
