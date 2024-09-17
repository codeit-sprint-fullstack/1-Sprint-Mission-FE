import { createContext, useContext, useState } from "react";
import * as authApi from "@/pages/api/auth";
import * as userApi from "@/pages/api/user";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const getMe = async () => {
    try {
      const data = await userApi.getUserMe();
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (loginValue) => {
    try {
      const data = await authApi.login(loginValue);
      if (data) {
        localStorage.setItem("codeit-accessToken", data.accessToken);
        localStorage.setItem("codeit-refreshToken", data.refreshToken);
      }
      getMe();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {};

  const updateMe = () => {};

  return (
    <AuthContext.Provider value={{ user, login, logout, updateMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("콘텍스트 프로바이더가 없습니다.");
  }
  return context;
}
