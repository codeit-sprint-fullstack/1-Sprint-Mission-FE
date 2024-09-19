import Desktop_logo from "@/images/desktop_logo.png";
import Mobile_logo from "@/images/mobile_logo.png";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/rotues";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className={styles.headerContainer}>
        <div>
          <Link href={ROUTES.HOME} passHref>
            <Image src={Desktop_logo} alt="logo" className={styles.logo} />
            <Image src={Mobile_logo} alt="logo" className={styles.mobileLogo} />
          </Link>
        </div>
        <div className={styles.moves}>
          <Link href={ROUTES.BOARD} passHref>
            <p className={router.pathname === "/board" ? styles.active : ""}>
              자유게시판
            </p>
          </Link>
          <Link href={ROUTES.MARKET} passHref>
            <p className={router.pathname === "/market" ? styles.active : ""}>
              중고마켓
            </p>
          </Link>
        </div>
        <div className={styles.login_btn}>
          <Link href={ROUTES.LOGIN} passHref>
            <button>로그인</button>
          </Link>
        </div>
      </div>
    </>
  );
}
