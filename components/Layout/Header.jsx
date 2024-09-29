import Desktop_logo from "@/images/desktop_logo.png";
import Mobile_logo from "@/images/mobile_logo.png";
import ic_profile from "@/images/ic_profile.png";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/rotues";
import { getUserProfile, refreshToken } from "@/utils/authApi";
import { useState, useEffect, useCallback } from "react";

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const clearTokensFromLocalStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const authenticateUser = useCallback(async () => {
    try {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");

      if (access && refresh) {
        const userData = await getUserProfile();
        setUserInfo(userData);
        setIsAuthenticated(true);
      } else if (!access && refresh) {
        await refreshToken();
        const userData = await getUserProfile();
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
      <Link href={ROUTES.HOME} passHref>
        <Image src={Desktop_logo} alt="logo" className={styles.logo} />
        <Image src={Mobile_logo} alt="logo" className={styles.mobileLogo} />
      </Link>

      <div className={styles.moves}>
        <Link href={ROUTES.BOARD} passHref>
          <p className={router.pathname === "/board" ? styles.active : ""}>
            자유게시판
          </p>
        </Link>
        <Link href={ROUTES.ITEMS} passHref>
          <p className={router.pathname === "/items" ? styles.active : ""}>
            중고마켓
          </p>
        </Link>
      </div>

      {isAuthenticated ? (
        <div className={styles.userInfo}>
          <Image
            src={ic_profile}
            alt="profile"
            className={styles.userProfile}
          />
          <p className={styles.userNickname}>{userInfo?.nickname}</p>
          <div className={styles.logout_btn}>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      ) : (
        <div className={styles.login_btn}>
          <Link href={ROUTES.LOGIN} passHref>
            <button>로그인</button>
          </Link>
        </div>
      )}
    </div>
  );
}
