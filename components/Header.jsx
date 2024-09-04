import styles from "@/styles/header.module.css";
import mainLog from "../public/images/mainlogo.png";
import mb_Log from "../public/images/mb_logo.png";
import useImgResize from "../hooks/useReturnResize.js";
import Link from "next/link";
import Image from "next/image";

function Header() {
  const view = useImgResize();

  const getLinkStyle = ({ isActive }) => {
    return {
      color: isActive && "#3692FF",
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
            <Link href="/">자유게시판</Link>
          </div>
          <div className={styles.nav_content}>
            <Link href="/Items">중고마켓</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
