import Image from "next/image";
import styles from "@/components/Header/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Header() {
  const router = useRouter();
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderImgContainer}>
        <Image
          src="/logo-img.svg"
          alt="logo"
          fill={true}
          className={styles.HeaderImg}
          onClick={() => (window.location.href = "/")}
        />
      </div>
      <div className={styles.HeaderMenu}>
        <Link
          href="/"
          className={router.pathname === "/" ? styles.active : styles.notactive}
        >
          <p>자유 게시판</p>
        </Link>
        <Link
          href="/market"
          className={
            router.pathname === "/market" ? styles.active : styles.notactive
          }
        >
          <p>중고마켓</p>
        </Link>
      </div>
      <button className={styles.HeaderBtn}>로그인</button>
    </div>
  );
}
