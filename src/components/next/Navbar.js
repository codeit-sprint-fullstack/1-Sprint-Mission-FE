import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css'; 

const Navbar = () => {
  const [logoSrc, setLogoSrc] = useState('/image/logo.svg');
  const router = useRouter();

  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth <= 743) {
        setLogoSrc('/image/mobile_logo.svg');
      } else {
        setLogoSrc('/image/logo.svg');
      }
    };

    window.addEventListener('resize', updateLogo);
    updateLogo(); // 초기 로고 설정

    return () => {
      window.removeEventListener('resize', updateLogo);
    };
  }, []);

  // 모듈 방식으로 클래스 적용
  const navbarClass = router.pathname === '/registration' ? `${styles.navbar} ${styles.registrationPage}` : styles.navbar;

  return (
    <nav className={navbarClass}>
      <img
        src={logoSrc}
        alt="Panda"
        className={styles.panda} // CSS 모듈 방식으로 클래스 적용
        onClick={() => router.push('/')}
        style={{ cursor: 'pointer' }}
      />
      <div className={styles.navLinks}> {/* CSS 모듈 방식으로 클래스 적용 */}
        <Link href="/" passHref>
          <span className={styles.boardLink}>자유게시판</span>
        </Link>
        <Link href="/items" passHref>
          <span className={`${styles.marketLink} ${router.pathname === '/items' ? styles.active : ''}`}>
            중고마켓
          </span>
        </Link>
      </div>
      {router.pathname === '/registration' ? (
        <button className={styles.loginButton}>로그인</button>
      ) : (
        <img src="/image/profile.svg" alt="Profile" className={styles.profile} />
      )}
    </nav>
  );
};

export default Navbar;

