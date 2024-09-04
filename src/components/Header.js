"use client";

import React from "react";
import pandaLogo from "../assets/images/panda-face.png";
import pandaMarket from "../assets/images/panda-market.png";
import profileImage from "../assets/images/profile-image.png";
import Link from "next/link"; // Next.js의 Link
import styles from "./Header.module.css"; // CSS 모듈 임포트

/* 판다마켓 헤더 */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={pandaLogo} alt="Panda Logo" className={styles.logo} />
        <img
          src={pandaMarket}
          alt="Panda Market"
          className={styles.logo}
          id={styles.pandaMarketLogo}
        />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/free-board">자유게시판</Link>
          </li>
          <li>
            <Link id={styles.itemPageMarket} href="/items">
              중고마켓
            </Link>
          </li>
        </ul>
      </nav>
      <img src={profileImage} alt="Profile" className={styles.profile} />
    </header>
  );
}

export default Header;
