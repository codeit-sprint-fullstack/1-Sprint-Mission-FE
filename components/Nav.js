// components/Nav.js
import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeftContainer}>
        <div className={styles.navbarLogo}>
          <Link href="/">
            <Image
              src="/group19.png"
              alt="판다마켓 로고"
              width={153}
              height={51}
            />
          </Link>
        </div>
        <ul className={styles.navbarLinks}>
          <li>
            <Link href="/board">자유게시판</Link>
          </li>
          <li>
            <Link href="/articles/new">중고마켓</Link>
          </li>
        </ul>
      </div>
      <div className={styles.navbarAuth}>
        <button className={styles.loginBtn}>로그인</button>
      </div>
    </nav>
  );
};

export default Nav;
