// Nav.jsx
import Image from "next/image";
import styles from "./Nav.module.css";
import Link from "next/link";

export default function Nav() {
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
            <div className={styles.link}>자유게시판</div>
            <div className={styles.link}>중고마켓</div>
          </div>
        </div>
        <div className={styles.loginButton}>로그인</div>
      </div>
    </div>
  );
}
