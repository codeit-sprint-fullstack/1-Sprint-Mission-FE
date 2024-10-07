"use client";

import React, { useEffect, useState } from "react";
import styles from "./FreeBoardHeader.module.css"; // CSS 모듈 임포트
import Image from "next/image"; // Next.js의 Image 컴포넌트 임포트
import Link from "next/link";
import { loginUser, fetchUserData, refreshAccessToken } from "../api/api"; // refreshAccessToken 추가

/* 자유게시판 홈페이지 헤더 */
export default function FreeBoardPageHeader() {
  const [user, setUser] = useState(null);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        console.log("토큰:", token);

        const response = await fetchUserData(token);
        console.log("유저 데이터 응답:", response);
        setUser(response);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "jwt expired"
      ) {
        // accessToken이 만료된 경우, refreshToken 사용
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const newTokenData = await refreshAccessToken(refreshToken);
            localStorage.setItem("accessToken", newTokenData.accessToken); // 새 토큰 저장
            await loadUserData(); // 다시 유저 정보 가져오기 (await 추가)
          }
        } catch (refreshError) {
          console.error("토큰 갱신 실패:", refreshError);
        }
      } else {
        console.error(
          "유저 정보를 가져오는 데 실패했습니다:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      loadUserData(); // 컴포넌트가 처음 렌더링될 때 유저 정보 가져오기
    }
  }, []);

  return (
    <header className={styles.header}>
      {/* 로고와 판다 마켓 로고를 담는 컨테이너 */}
      <div className={styles.logoContainer}>
        <Image
          src="/images/panda-face.png" // public/images 폴더에서 이미지 접근
          alt="Panda Logo"
          layout="fixed"
          width={40} // CSS에서 height: 40px로 설정했으므로 width를 40px로 설정
          height={40}
          className={styles.logo}
        />
        <Image
          src="/images/panda-market.png" // public/images 폴더에서 이미지 접근
          alt="Panda Market"
          layout="fixed"
          width={103}
          height={70}
          className={styles.pandaMarketLogo}
        />
      </div>
      {/* 네비게이션 메뉴 */}
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link className={styles.freeBoard} href="/free-board">
              자유게시판
            </Link>
          </li>
          <li>
            <Link className={styles.itemPageMarket} href="/items">
              중고마켓
            </Link>
          </li>
        </ul>
      </nav>
      {user ? (
        <div className={styles.loginprofile}>
          <Image
            src="/images/profile-image.png"
            alt="Profile"
            width={40}
            height={40}
            className={styles.profileImage}
          />
          <span className={styles.username}>{user.nickname}</span>
        </div>
      ) : (
        <Link href="/login">
          <button className={styles.loginButton}>로그인</button>
        </Link>
      )}
    </header>
  );
}
