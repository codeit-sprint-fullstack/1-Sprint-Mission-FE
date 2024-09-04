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
        <Image
          src="/images/panda-face.png" // public/images 폴더에서 이미지 접근
          alt="Panda Logo"
          width={50}
          height={50}
          className={styles.logo}
        />
        <Image
          src="/images/panda-market.png" // public/images 폴더에서 이미지 접근
          alt="Panda Market"
          width={100}
          height={50}
          className={styles.logo} // id 대신 클래스 이름을 사용
        />
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
      <Image
        src="/images/profile-image.png" // public/images 폴더에서 이미지 접근
        alt="Profile"
        width={50}
        height={50}
        className={styles.profile}
      />
    </header>
  );
}

export default Header;
