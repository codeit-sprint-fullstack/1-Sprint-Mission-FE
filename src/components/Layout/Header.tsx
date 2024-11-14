import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/rotues";
import { getUserProfile, refreshToken } from "@/utils/authApi";
import { useState, useEffect, useCallback } from "react";
import { UserProfile } from "@/types/Types";

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);

  const clearTokensFromLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const authenticateUser = useCallback(async () => {
    try {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");

      if (access && refresh) {
        const userData: UserProfile = await getUserProfile();
        setUserInfo(userData);
        setIsAuthenticated(true);
      } else if (!access && refresh) {
        await refreshToken();
        const userData: UserProfile = await getUserProfile();
        setUserInfo(userData);
        setIsAuthenticated(true);
        router.push(ROUTES.ITEMS);
      } else {
        clearTokensFromLocalStorage();
        setIsAuthenticated(false);
        router.push(ROUTES.LOGIN);
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      clearTokensFromLocalStorage();
      setIsAuthenticated(false);
      router.push(ROUTES.LOGIN);
    }
  }, [router]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  const handleLogout = () => {
    clearTokensFromLocalStorage();
    setIsAuthenticated(false);
    setUserInfo(null);
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className={styles.headerContainer}>
      {/* 기존 <Link> 내부에 <a> 태그 제거 */}
      <Link href={ROUTES.HOME}>
        <div>
          <Image
            src="/desktop_logo.png"
            alt="logo"
            className={styles.logo}
            width={40}
            height={40}
          />
          <Image
            src="/mobile_logo.png"
            alt="logo"
            className={styles.mobileLogo}
            width={40}
            height={40}
          />
        </div>
      </Link>

      <div className={styles.moves}>
        <Link href={ROUTES.BOARD}>
          <p className={router.pathname === "/board" ? styles.active : ""}>
            자유게시판
          </p>
        </Link>
        <Link href={ROUTES.ITEMS}>
          <p className={router.pathname === "/items" ? styles.active : ""}>
            중고마켓
          </p>
        </Link>
      </div>

      {isAuthenticated ? (
        <div className={styles.userInfo}>
          <Image
            src="/ic_profile.png"
            alt="profile"
            className={styles.userProfile}
            width={40}
            height={40}
          />
          <p className={styles.userNickname}>{userInfo?.nickname}</p>
          <div className={styles.logout_btn}>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      ) : (
        <div className={styles.login_btn}>
          <Link href={ROUTES.LOGIN}>
            <button>로그인</button>
          </Link>
        </div>
      )}
    </div>
  );
}
