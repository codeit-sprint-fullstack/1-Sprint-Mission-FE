import logo from '../public/logo.png';
import logoMobile from '../public/logo_mobile.png';
import loginBtn from '../public/login_btn.png';

import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';
import Link from 'next/link';
import { useAuth } from '../utils/AuthProvider';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.navMenu}>
          <div className={styles.menu}>
            <Link href='/' className={styles.link}>
              <Image src={logo} alt='로고' className={styles.logo} priority />
              <Image
                src={logoMobile}
                alt='모바일 로고'
                className={styles.logoMobile}
                priority
              />
            </Link>
            <Link href='/freeboard' className={styles.link}>
              <span className={styles.freeboard}>자유게시판</span>
            </Link>
            <Link href='/fleamarket' className={styles.link}>
              <span className={styles.fleamarket}>중고마켓</span>
            </Link>
          </div>
          {user ? (
            <div>
              <div>{user.nickname}</div>
              <div>로그아웃</div>
            </div>
          ) : (
            <Link href='/login' className={styles.link}>
              <Image src={loginBtn} alt='로그인버튼' />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
