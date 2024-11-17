import { useState, useEffect } from "react";
import { isAuthenticated, getUserInfo, removeTokens } from "@/utils/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      const userInfo = getUserInfo();
      setUser(userInfo);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    removeTokens();
    setUser(null);
    window.location.href = "/";
  };

  return { user, loading, logout };
}
