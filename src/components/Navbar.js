import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import { logOut } from "../api/authApi";

const Navbar = () => {
  const [logoSrc, setLogoSrc] = useState("/image/logo.svg");
  const [nickname, setNickname] = useState("");
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

  // localStorage에서 닉네임을 불러오는 함수
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

    loadNickname(); // 컴포넌트가 처음 렌더링될 때 닉네임 불러오기

    // 다른 창에서 localStorage가 업데이트되었을 때도 닉네임을 불러오도록 감지
    window.addEventListener("storage", loadNickname);

    return () => {
      window.removeEventListener("storage", loadNickname);
    };
  }, []);

  const navbarClass =
    router.pathname === "/items/registration"
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
        <Link href="/board" passHref>
          <span className={styles.boardLink}>자유게시판</span>
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

