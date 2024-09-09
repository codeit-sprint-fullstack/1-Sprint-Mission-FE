import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/pandaLogo.png";
import smallLogo from "../images/pandaLogo_small.png";
import icon from "../images/userIcon.png";
import styles from "@styles/Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navBar}>
      <div className={styles.navLeft}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt="Home Logo" />
          <Image
            className={styles.smallLogo}
            src={smallLogo}
            alt="Home Logo small"
          />
        </Link>
        <div className={`${styles.menu} text-2lg bold`}>
          <span className={styles.menuContent}>
            <Link href="/community">자유게시판</Link>
          </span>
          <span className={styles.menuContent}>
            <Link href="/items">중고마켓</Link>
          </span>
        </div>
      </div>
      <Image className={styles.icon} src={icon} alt="User Icon" />
    </nav>
  );
}

export default Navigation;
