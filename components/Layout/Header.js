import Desktop_logo from "@/images/desktop_logo.png";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link"; // Link 컴포넌트 추가
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className={styles.headerContainer}>
        <div>
          <Link href="/" passHref>
            <Image src={Desktop_logo} alt="logo" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.moves}>
          <Link href="/board" passHref>
            <p className={router.pathname === "/board" ? styles.active : ""}>
              자유게시판
            </p>
          </Link>
          <Link href="/market" passHref>
            <p className={router.pathname === "/market" ? styles.active : ""}>
              중고마켓
            </p>
          </Link>
        </div>
        <div className={styles.login_btn}>
          <button>로그인</button>
        </div>
      </div>
    </>
  );
}
