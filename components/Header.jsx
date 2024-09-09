import { useRouter } from 'next/router';
import styles from './Header.module.css';
import Image from 'next/image';
import logo from '../public/images/headerLogo.svg';
import SmallButton from './SmallButton'

export default function Header() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerLogoTextHug}>
      <a href="/" className={styles.logoLink}>
        <Image
          src={logo}
          alt="Logo"
          width={153}
          height={51}
        />
      </a>
      <nav className={styles.headerTextHug}>
        <a
          href="/community"
          className={pathname === '/community' ? styles.headerTextActive : styles.headerText}
        >
          자유게시판
        </a>
        <a
          href="/market"
          className={pathname === '/market' ? styles.headerTextActive : styles.headerText}
        >
          중고마켓
        </a>
        </nav>
        
      </div>
      <SmallButton>로그인</SmallButton>

    </header>
  );
}
