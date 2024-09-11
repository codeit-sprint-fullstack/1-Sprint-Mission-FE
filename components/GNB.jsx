import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./GNB.module.css";
import normalLogo from "../public/images/headerLogo.svg";
import smallLogo from "../public/images/headerSmallLogo.svg";
import SmallButton from "./ui/SmallButton";

const NAV_ITEMS = [
  { href: "/community", text: "자유게시판" },
  { href: "/market", text: "중고마켓" },
];

const MemoizedSmallButton = React.memo(SmallButton);

export default function Header() {
  const { pathname } = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoProps = useMemo(
    () => ({
      src: isSmallScreen ? smallLogo : normalLogo,
      alt: isSmallScreen ? "Small Logo" : "Logo",
      width: isSmallScreen ? 80 : 153,
      height: isSmallScreen ? 41 : 51,
      priority: true,
    }),
    [isSmallScreen]
  );

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerLogoTextHug}>
        <Link href="/" className={styles.logoLink}>
          <Image {...logoProps} />
        </Link>
        <nav className={styles.headerTextHug}>
          {NAV_ITEMS.map(({ href, text }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href ? styles.headerTextActive : styles.headerText
              }
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
      <MemoizedSmallButton>로그인</MemoizedSmallButton>
    </header>
  );
}
