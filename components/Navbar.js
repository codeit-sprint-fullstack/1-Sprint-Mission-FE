import logo from '../public/logo.png';
import loginBtn from '../public/login_btn.png';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      <div className={styles.nav}>
        <div className={styles.navMenu}>
          <div className={styles.menu}>
            <Link href='/' className={styles.link}>
              <Image src={logo} alt='로고' priority />
            </Link>
            <Link href='/freeboard' className={styles.link}>
              <span className={styles.freeboard}>자유게시판</span>
            </Link>
            <span className={styles.fleamarket}>중고마켓</span>
          </div>
          <Image src={loginBtn} alt='로그인버튼' />
        </div>
      </div>
    </>
  );
}
