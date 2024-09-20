"use client";

import React from "react";
import Link from "next/link"; // Next.js의 Link
import styles from "./Header.module.css"; // CSS 모듈 임포트
import Image from "next/image";

/* 판다마켓 헤더 */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/panda-face.png" // public/images 폴더에서 이미지 접근
            alt="Panda Logo"
            layout="fixed"
            width={40} // CSS에서 height: 40px로 설정했으므로 width를 40px로 설정
            height={40}
            className={styles.logo}
          />
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/panda-market.png" // public/images 폴더에서 이미지 접근
            alt="Panda Market"
            layout="fixed"
            width={103}
            height={70}
            className={styles.pandaMarketLogo} // 판다 마켓 로고에 맞는 클래스
          />
        </div>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/free-board">자유게시판</Link>
          </li>
          <li>
            <Link href="/items" className={styles.itemPageMarket}>
              중고마켓
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/profile-image.png" // public/images 폴더에서 이미지 접근
          alt="Profile"
          layout="fixed"
          width={40} // CSS에서 height: 40px로 설정했으므로 width를 40px로 설정
          height={40}
          className={styles.profile}
        />
      </div>
    </header>
  );
}

export default Header;
