import logo from '../public/logo.png';
import logoMobile from '../public/logo_mobile.png';
import loginBtn from '../public/login_btn.png';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';
import Link from 'next/link';
import { useAuth } from '../utils/AuthProvider';
import { useRouter } from 'next/router';
import { NavLogButton } from '@/utils/Button';

export default function Navbar() {
  const { user, login } = useAuth();
  const router = useRouter();

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
              <span
                className={
                  router.pathname.startsWith('/freeboard')
                    ? styles.selectBoard
                    : styles.none
                }
              >
                자유게시판
              </span>
            </Link>
            <Link href='/fleamarket' className={styles.link}>
              <span
                className={
                  router.pathname.startsWith('/fleamarket')
                    ? styles.selectBoard
                    : styles.none
                }
              >
                중고마켓
              </span>
            </Link>
          </div>
          {user ? (
            <div>
              <div>{user.nickname}</div>
              <NavLogButton label='로그아웃' />
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
