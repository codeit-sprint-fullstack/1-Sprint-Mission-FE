import Container from './Container';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';
import facebook_logo from '@/public/ic_facebook.svg';
import twitter_logo from '@/public/ic_twitter.svg';
import youtube_logo from '@/public/ic_youtube.svg';
import instagram_logo from '@/public/ic_instagram.svg';

export default function Footer() {
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
    <div className={styles.footer}>
      <Container className={styles.footerContainer}>
        {!isMobile ? (
          <>
            <div className={styles.containerLeft}>
              <p>ⓒcodeit - 2024</p>
            </div>
            <div className={styles.containerCenter}>
              <p>Privacy Policy</p>
              <p>FAQ</p>
            </div>
            <div className={styles.containerImg}>
              <Link href="https://www.facebook.com">
                <div className={styles.imgWrapper}>
                  <Image src={facebook_logo} alt="페이스북 로고" />
                </div>
              </Link>
              <Link href="https://www.x.com">
                <div className={styles.imgWrapper}>
                  <Image src={twitter_logo} alt="트위터 로고" />
                </div>
              </Link>
              <Link href="https://www.youtube.com">
                <div className={styles.imgWrapper}>
                  <Image src={youtube_logo} alt="유튜브 로고" />
                </div>
              </Link>
              <Link href="https://www.instagram.com">
                <Image src={instagram_logo} alt="인스타그램 로고" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles.mobile}>
              <div className={styles.containerCenter}>
                <p>Privacy Policy</p>
                <p>FAQ</p>
              </div>
              <div className={styles.containerImg}>
                <Link href="https://www.facebook.com">
                  <div className={styles.imgWrapper}>
                    <Image src={facebook_logo} alt="페이스북 로고" />
                  </div>
                </Link>
                <Link href="https://www.x.com">
                  <div className={styles.imgWrapper}>
                    <Image src={twitter_logo} alt="트위터 로고" />
                  </div>
                </Link>
                <Link href="https://www.youtube.com">
                  <div className={styles.imgWrapper}>
                    <Image src={youtube_logo} alt="유튜브 로고" />
                  </div>
                </Link>
                <Link href="https://www.instagram.com">
                  <Image src={instagram_logo} alt="인스타그램 로고" />
                </Link>
              </div>
            </div>
            <div className={styles.containerLeft}>
              <p>ⓒcodeit - 2024</p>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
