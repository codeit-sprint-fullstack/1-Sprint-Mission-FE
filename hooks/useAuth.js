import { useState, useEffect, useCallback } from "react";
import {
  isAuthenticated,
  getUserInfo,
  removeTokens,
  refreshToken,
  loginUser,
} from "@/utils/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = useCallback(async () => {
    try {
      if (isAuthenticated()) {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("정보요청실패", error);
      if (error.response && error.response.status === 401) {
        await logout();
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const login = async (credentials) => {
    try {
      await loginUser(credentials);
      await fetchUserInfo();
    } catch (error) {
      console.error("로그인 실패", error);
      throw error;
    }
  };

  const logout = useCallback(async () => {
    try {
      await removeTokens();
    } catch (error) {
      console.error("로그아웃실패", error);
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  }, []);

  const refreshUserInfo = useCallback(async () => {
    try {
      await refreshToken();
      await fetchUserInfo();
    } catch (error) {
      console.error("유저정보", error);
      if (error.response && error.response.status === 401) {
        await logout();
      }
    }
  }, [fetchUserInfo, logout]);

  return { user, loading, login, logout, refreshUserInfo };
}
