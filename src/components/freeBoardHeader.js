import Image from "next/image";
import Link from "next/link";
import styles from "./FreeBoardHeader.module.css"; // CSS 모듈 파일 경로

export default function ItemsPageHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/assets/images/panda-face.png"
          alt="Panda Logo"
          className={styles.logo}
          width={40}
          height={40}
        />
        <Image
          src="/assets/images/panda-market.png"
          alt="Panda Market"
          className={styles.pandaMarketLogo}
          width={103}
          height="auto"
        />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/free-board">
              <a className={styles.freeBoard}>자유게시판</a>
            </Link>
          </li>
          <li>
            <Link href="/items">
              <a className={styles.itemPageMarket}>중고마켓</a>
            </Link>
          </li>
        </ul>
      </nav>
      <button className={styles.loginButton}>로그인</button>
    </header>
  );
}
