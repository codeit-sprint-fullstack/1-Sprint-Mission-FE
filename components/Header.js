import Image from "next/image";
import basicLogo from "@/images/basicLogo.png";
import styles from "./Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <Image src={basicLogo} className={styles.logo} alt="logo" />
        </Link>
        <div>
          <Link
            href="/board"
            className={`${styles.title} ${
              router.pathname === "/board" ? styles.active : ""
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/market"
            className={`${styles.title} ${
              router.pathname === "/market" ? styles.active : ""
            }`}
          >
            중고마켓
          </Link>
        </div>
      </div>
      <Link href="/login">
        <button className={styles.login}>로그인</button>
      </Link>
    </header>
  );
}
