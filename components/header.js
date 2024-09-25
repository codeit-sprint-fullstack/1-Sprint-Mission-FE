import Image from "next/image";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function NavLink({ href, children, activeClassName }) {
  const router = useRouter();
  const className = router.pathname === href ? activeClassName : styles.link;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

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
            <NavLink href="/" activeClassName={styles.active_link}>
              자유게시판
            </NavLink>
            <NavLink href="/market" activeClassName={styles.active_link}>
              중고마켓
            </NavLink>
          </div>
        </div>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </div>
  );
}
