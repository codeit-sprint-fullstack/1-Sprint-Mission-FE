import { useState, useEffect } from "react";
import { getUserProfile } from "@/utils/authApi";

export default function useAuth(ownerId) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const fetchUserData = async () => {
        try {
          const userData = await getUserProfile(token);
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
