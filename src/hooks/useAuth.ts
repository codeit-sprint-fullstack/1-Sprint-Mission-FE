import { useState, useEffect } from "react";
import { getUserProfile } from "@/utils/authApi";

export default function useAuth(ownerId: number): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const fetchUserData = async () => {
        try {
          // 사용자 프로필 정보 가져오기
          const userData = await getUserProfile();

          setIsAuthenticated(ownerId === (userData.id as number));
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
