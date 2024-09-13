import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import Logo from '@/public/pandaMarketLogo.svg';
import Button from './Button';

// Header component
// 해당 컴포넌트는 로고, 메뉴, 로그인 버튼으로 구성한다.
// 모든 페이지에 적용된다. _app.js에 적용한다.
// 로고를 클릭하면 홈페이지로 이동한다. href='/' (이번 미션에서는 구현하지 않음)
// 자유게시판 메뉴를 클릭하면 게시판 페이지로 이동한다. href='/freeboard'
// 중고마켓 메뉴를 클릭하면 마켓 페이지로 이동한다. href='/market' (이번 미션에서는 구현하지 않음)
// 로그인 버튼을 누르면 로그인 페이지로 이동한다. (이번 미션에서는 구현하지 않음)

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logoWrapper} href="/">
          <Image src={Logo} alt="판다 마켓 로고" fill priority />
        </Link>
        <div className={`${styles.menu} ${styles.font}`}>
          <Link className={styles.freeboard} href="/freeboard">
            <span>자유게시판</span>
          </Link>
          <Link className={styles.market} href="/market">
            <span>중고마켓</span>
          </Link>
        </div>
        <Link className={styles.loginBtn} href="/login">
          <Button name="로그인" />
        </Link>
      </div>
    </header>
  );
}
