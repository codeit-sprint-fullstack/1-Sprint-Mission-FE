// Nav.js
import React from "react";
import Image from "next/image";
import styles from "./Nav.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query"; // useQuery를 사용하기 위해 추가
import { fetchCurrentUser } from "../api/api"; // 사용자 정보를 가져오는 함수 import

export default function Nav() {
  const router = useRouter();

  // useQuery를 사용하여 사용자 정보 가져오기
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false, // 에러 발생 시 재시도 하지 않음
  });

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    if (typeof window !== "undefined") {
      router.push("/login");
    }
  };

  if (isLoading) return <div>로딩 중...</div>;

  if (error) {
    // 에러가 인증 오류인 경우 로그인 페이지로 리다이렉트
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        router.push("/login");
      }
      return null;
    }
    return <div>에러 발생: {error.message}</div>;
  }

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
              <Image
                src="/ic_profile.png"
                width={32}
                height={32}
                alt="프로필 이미지"
                className={styles.profileImage}
              />
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
