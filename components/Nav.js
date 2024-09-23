import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Nav.module.css";
import Link from "next/link";
import axios from "../lib/axios";
import { useRouter } from "next/router";

export default function Nav() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/user");
        setUser(response.data);
      } catch (error) {
        console.error("유저 정보 조회 실패:", error);
      }
    };

    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUser();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerContainer}>
          <Link href="/">
            <Image
              src="/group19.png"
              width={153}
              height={51}
              alt="logo"
              className={styles.logo}
            />
          </Link>
          <div className={styles.linkContainer}>
            <Link href="/board" className={styles.link}>
              자유게시판
            </Link>
            <Link href="/items" className={styles.link}>
              중고마켓
            </Link>
          </div>
        </div>
        <div className={styles.profileContainer}>
          {user ? (
            <div className={styles.userInfo}>
              <span>{user.nickname}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                로그아웃
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              로그인
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
