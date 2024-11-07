import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as authApi from "@/pages/api/auth";
import { useRouter } from "next/router";
import { User } from "@/utils/interface/User";

interface LoginUser {
  email: string;
  password: string;
}

interface AuthContextValues {
  user: User | null;
  isPending: boolean;
  login: (value: LoginUser) => void;
  logout: () => void;
  updateMe: () => void;
}

const AuthContext = createContext<AuthContextValues>({
  user: null,
  isPending: false,
  login: (value: LoginUser) => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isPending, setIsPending] = useState<boolean>(true);

  const getMe = async () => {
    //사용자정보의 유무의 따라 리다이렉트를 하기위한 pending 상태추가
    setIsPending(true);
    try {
      const data = await authApi.getUserMe();
      if (data) {
        //새로운 사용자정보가 있으면 갱신
        setUser(data);
      }
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      //pending 상태는 false로 초기화
      setIsPending(false);
    }
  };

  const login = async (loginValue: LoginUser) => {
    const res = await authApi.login(loginValue);
    console.log(res.status);
    if (res.status === 200) {
      //사용자정보 갱신
      await getMe();
    }
  };

  const logout = () => {};

  const updateMe = () => {};

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isPending, login, logout, updateMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth(required: boolean = true) {
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
  }, [required, context.user, context.isPending]);
  return context;
}
