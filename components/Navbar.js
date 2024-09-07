import logo from '../public/logo.png';
import loginBtn from '../public/login_btn.png';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  return (
    <>
      <div className={styles.nav}>
        <div className={styles.navMenu}>
          <div className={styles.menu}>
            <Image src={logo} alt='로고' />
            <span className={styles.freeboard}>자유게시판</span>
            <span className={styles.fleamarket}>중고마켓</span>
          </div>
          <Image src={loginBtn} alt='로그인버튼' />
        </div>
      </div>
    </>
  );
}
