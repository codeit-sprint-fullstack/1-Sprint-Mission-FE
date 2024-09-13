import Image from "next/image";
import styles from "@/styles/Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <div className={styles.header_container}>
          <Link href="/">
            <Image
              src="/logo.png"
              width={153}
              height={51}
              alt="logo"
              className={styles.logo}
            />
          </Link>
          <div className={styles.link_container}>
            <div className={styles.link}>자유게시판</div>
            <div className={styles.link}>중고마켓</div>
          </div>
        </div>
        <div className={styles.login}>로그인</div>
      </div>
    </div>
  );
}
