import styles from "@/styles/header.module.css";
import mainLog from "../public/images/mainlogo.png";
import mb_Log from "../public/images/mb_logo.png";
import Link from "next/link";
import Image from "next/image";
import useWindowResize from "@/hooks/useWindowResize";
import { useRouter } from "next/router";

function Header() {
  const view = useWindowResize();
  const router = useRouter();
  const path = router.pathname;

  const getLinkStyle = (href) => {
    return {
      color: href === path ? "#3692FF" : "inherit",
    };
  };

  return (
    <header>
      <div className={styles.header_box}>
        <Link href="/">
          <Image
            src={view === "isMobile" ? mb_Log : mainLog}
            className={styles.logo_img}
            alt="메인판다로고"
          />
        </Link>
        <div className={styles.nav_bar}>
          <div className={styles.nav_content}>
            <Link href="/Articles" style={getLinkStyle("/Articles") || {}}>
              자유게시판
            </Link>
          </div>
          <div className={styles.nav_content}>
            <Link href="/Items" style={getLinkStyle("/Items") || {}}>
              중고마켓
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
