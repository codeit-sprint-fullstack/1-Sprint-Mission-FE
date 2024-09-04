"use client";

import React from "react";
import styles from "./Header.module.css"; // CSS 모듈 임포트
import pandaLogo from "../assets/images/panda-face.png";
import pandaMarket from "../assets/images/panda-market.png";
import Link from "next/link";

/* 중고마켓 홈페이지 헤더 */
function ItemsPageHeader() {
  return (
    <header className={styles.header}>
      {/* 로고와 판다 마켓 로고를 담는 컨테이너 */}
      <div className={styles.logoContainer}>
        <img src={pandaLogo} alt="Panda Logo" className={styles.logo} />
        <img
          src={pandaMarket}
          alt="Panda Market"
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
