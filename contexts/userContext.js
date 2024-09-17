import { createContext, useContext, useState } from "react";
import * as api from "@/pages/api/auth";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  const login = async (loginValue) => {
    await api.login(loginValue);
    getMe();
  };

  const logout = () => {};

  const getMe = () => {
    const data = api.getUserMe();
    if (data) {
      setUser(data);
    }
  };

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
