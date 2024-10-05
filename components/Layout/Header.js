import Image from "next/image";
import basicLogo from "@/images/basicLogo.png";
import defaultImg from "@/images/defaultUserImg.png";
import styles from "./Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/authApi";
import { useAuth } from "@/context/authContext";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth(); // 유저 정보 및 로그아웃 함수 가져오기

  useEffect(() => {
    // 유저 정보 가져오기
    const fetchUser = async () => {
      try {
        const user = await getUser(); // 유저 정보 API 호출
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      }
    };
    fetchUser();
  }, []);

  console.log(user);
  // const { nickname, image } = user;
  const nickname = user?.nickname;
  const image = user?.image;

  return (
    <header
      className={`${styles.header} ${
        router.pathname === "/login" || router.pathname === "/signup"
          ? styles.none
          : ""
      }`}
    >
      <div className={styles.container}>
        <Link href="/">
          <Image src={basicLogo} className={styles.logo} alt="logo" />
        </Link>
        <div>
          <Link
            href="/board"
            className={`${styles.title} ${
              router.pathname === "/board" ? styles.active : ""
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={`${styles.title} ${
              router.pathname === "/items" ? styles.active : ""
            }`}
          >
            중고마켓
          </Link>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {/* 임시 사용 로그 아웃 */}
        {user && (
          <button className={styles.logout} onClick={logout}>
            로그아웃
          </button>
        )}
        {user ? (
          <div className={styles.user}>
            <Image src={image ? image : defaultImg} alt="user-image" />
            <span>{nickname}</span>
          </div>
        ) : (
          <Link href="/login">
            <button className={styles.login}>로그인</button>
          </Link>
        )}
      </div>
    </header>
  );
}
