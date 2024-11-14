import { getUser } from "@/lib/authApi";
import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";

// Context 생성
const AuthContext = createContext(null);

// Context를 사용하는 커스텀 훅
export const useAuth = () => useContext(AuthContext);

// Provider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null); // 유저 정보 상태

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
  const login = (userData) => {
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
