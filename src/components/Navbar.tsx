import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import { logOut } from "../api/authApi";

const Navbar = () => {
  const [logoSrc, setLogoSrc] = useState<string>("/image/logo.svg");
  const [nickname, setNickname] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth <= 743) {
        setLogoSrc("/image/mobile_logo.svg");
      } else {
        setLogoSrc("/image/logo.svg");
      }
    };

    window.addEventListener("resize", updateLogo);
    updateLogo();

    return () => {
      window.removeEventListener("resize", updateLogo);
    };
  }, []);

  useEffect(() => {
    const loadNickname = () => {
      const storedNickname = localStorage.getItem("nickname");
      console.log("localStorage에서 불러온 nickname:", storedNickname);
      if (storedNickname) {
        setNickname(storedNickname);
      } else {
        console.error("닉네임이 저장되지 않았습니다.");
      }
    };

    loadNickname();
    window.addEventListener("storage", loadNickname);

    return () => {
      window.removeEventListener("storage", loadNickname);
    };
  }, []);

  const navbarClass = router.pathname === "/items/registration"
    ? `${styles.navbar} ${styles.registrationPage}`
    : styles.navbar;

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logOut();
    setNickname("");
    localStorage.removeItem("nickname");
    router.push("/login");
  };

  return (
    <nav className={navbarClass}>
      <img
        src={logoSrc}
        alt="Panda"
        className={styles.panda}
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      />
      <div className={styles.navLinks}>
        <Link href="/articles" passHref>
          <span
            className={`${styles.articlesLink} ${
              router.pathname === "/articles" ? styles.active : ""
            }`}
          >
            자유게시판
          </span>
        </Link>
        <Link href="/items" passHref>
          <span
            className={`${styles.marketLink} ${
              router.pathname === "/items" ? styles.active : ""
            }`}
          >
            중고마켓
          </span>
        </Link>
      </div>

      {nickname ? (
        <div className={styles.profileContainer}>
          <img
            src="/image/profile.svg"
            alt="Profile"
            className={styles.profile}
          />
          <span className={styles.nickname}>{nickname}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            로그아웃
          </button>
        </div>
      ) : (
        <button className={styles.loginButton} onClick={handleLoginClick}>
          로그인
        </button>
      )}
    </nav>
  );
};

export default Navbar;

