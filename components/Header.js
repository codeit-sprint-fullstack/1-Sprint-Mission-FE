import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import Logo from '@/public/pandaMarketLogo.svg';
import LogoMobile from '@/public/pandaMarketLogoMobile.svg';
import Button from './Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Header component
// 해당 컴포넌트는 로고, 메뉴, 로그인 버튼으로 구성한다.
// 모든 페이지에 적용된다. _app.js에 적용한다.
// 로고를 클릭하면 홈페이지로 이동한다. href='/' (이번 미션에서는 구현하지 않음)
// 자유게시판 메뉴를 클릭하면 게시판 페이지로 이동한다. href='/freeboard'
// 중고마켓 메뉴를 클릭하면 마켓 페이지로 이동한다. href='/market' (이번 미션에서는 구현하지 않음)
// 로그인 버튼을 누르면 로그인 페이지로 이동한다. (이번 미션에서는 구현하지 않음)

export default function Header() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 743);
  };

  // 화면 크기 변경을 감지하여 로고를 동적으로 변경
  useEffect(() => {
    checkMobile(); // 컴포넌트가 마운트될 때 실행
    window.addEventListener('resize', checkMobile); // 화면 크기 변경 시 실행

    return () => {
      window.removeEventListener('resize', checkMobile); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logoWrapper} href="/">
          <Image src={isMobile ? LogoMobile : Logo} alt="판다 마켓 로고" fill priority />
        </Link>
        <div className={`${styles.menu} ${styles.font}`}>
          <Link
            className={`${styles.freeboard} ${
              router.pathname === '/freeboard' ? styles.active : ''
            }`}
            href="/freeboard"
          >
            <p>자유게시판</p>
          </Link>
          <Link
            className={`${styles.market} ${router.pathname === '/market' ? styles.active : ''}`}
            href="/market"
          >
            <p>중고마켓</p>
          </Link>
        </div>
        <Link className={styles.loginBtn} href="/login">
          <Button name="로그인" />
        </Link>
      </div>
    </header>
  );
}
