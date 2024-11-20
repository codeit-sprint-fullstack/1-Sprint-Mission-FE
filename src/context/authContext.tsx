import { getUser } from "@/lib/authApi";
import { AuthContextType, User } from "@/types/Types";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Context 생성
const AuthContext = createContext<AuthContextType | null>(null);

// Context를 사용하는 커스텀 훅
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Provider 컴포넌트 생성
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // 유저 정보 상태

  // 페이지가 처음 렌더링될 때 유저 정보를 가져옴
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const user = await getUser(); // 유저 정보 API 호출
          setUser(user);
        } catch (error) {
          console.log("유저 정보 가져오기 실패:", error);
        }
      }
    };
    fetchUser();
  }, []);
  // 유저 정보 상태와 유틸리티 함수들을 Context로 제공
  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.removeItem("accessToken");
      setUser(null);
      router.push("/login");
    } else {
      console.log("token이 없습니다.");
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
