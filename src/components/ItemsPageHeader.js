"use client";

import React from "react";
import styles from "./Header.module.css"; // CSS 모듈 임포트
import Image from "next/image"; // Next.js의 Image 컴포넌트 임포트
import Link from "next/link";

/* 중고마켓 홈페이지 헤더 */
function ItemsPageHeader() {
  return (
    <header className={styles.header}>
      {/* 로고와 판다 마켓 로고를 담는 컨테이너 */}
      <div className={styles.logoContainer}>
        <Image
          src="/images/panda-face.png" // public/images 폴더에서 이미지 접근
          alt="Panda Logo"
          width={50} // 이미지의 폭
          height={50} // 이미지의 높이
          className={styles.logo}
        />
        <Image
          src="/images/panda-market.png" // public/images 폴더에서 이미지 접근
          alt="Panda Market"
          width={100} // 이미지의 폭
          height={50} // 이미지의 높이
          className={`${styles.logo} ${styles.pandaMarketLogo}`}
        />
      </div>
      {/* 네비게이션 메뉴 */}
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="#free-board">자유게시판</a>
          </li>
          <li>
            <Link className={styles.itemPageMarket} href="/items">
              중고마켓
            </Link>
          </li>
        </ul>
      </nav>
      {/* 로그인 버튼 */}
      <button className={styles.loginButton}>로그인</button>
    </header>
  );
}

export default ItemsPageHeader;
