import { useState, useEffect } from "react";
import { getUserProfile } from "@/utils/authApi";

// 사용자 프로필 타입 정의
interface UserProfile {
  id: number;
  nickname?: string;
  email: string;
  image?: string;
}

export default function useAuth(ownerId: number): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const fetchUserData = async () => {
        try {
          // 사용자 프로필 정보 가져오기
          const userData: UserProfile = await getUserProfile();
          setIsAuthenticated(ownerId === userData.id);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setIsAuthenticated(false);
          localStorage.removeItem("accessToken");
        }
      };

      fetchUserData();
    }
  }, [ownerId]);

  return isAuthenticated;
}
