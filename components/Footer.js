import Container from './Container';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';
import facebook_logo from '@/public/ic_facebook.svg';
import twitter_logo from '@/public/ic_twitter.svg';
import youtube_logo from '@/public/ic_youtube.svg';
import instagram_logo from '@/public/ic_instagram.svg';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Container className={styles.footerContainer} size="32px 400px">
        <div className={styles.test}>
          <div className={styles.containerLeft}>
            <p>ⓒcodeit - 2024</p>
          </div>
          <div className={styles.containerCenter}>
            <p>Privacy Policy</p>
            <p>FAQ</p>
          </div>
          <div className={styles.containerImg}>
            <div className={styles.imgWrapper}>
              <Link href="https://www.facebook.com">
                <Image src={facebook_logo} alt="페이스북 로고" />
              </Link>
              <Link href="https://www.x.com">
                <Image src={twitter_logo} alt="트위터 로고" />
              </Link>
              <Link href="https://www.youtube.com">
                <Image src={youtube_logo} alt="유튜브 로고" />
              </Link>
              <Link href="https://www.instagram.com">
                <Image src={instagram_logo} alt="인스타그램 로고" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
