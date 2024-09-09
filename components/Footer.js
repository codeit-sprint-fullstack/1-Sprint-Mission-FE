import footerLogo from '../public/codeit.png';
import facebookLogo from '../public/ic_facebook.png';
import youtuveLogo from '../public/ic_youtuve.png';
import instaLogo from '../public/ic_insta.png';
import twitterLogo from '../public/ic_twitter.png';
import Image from 'next/image';
import styles from '@/styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerList}>
          <Image
            src={footerLogo}
            alt='코드잇 로고'
            className={styles.codeitLogo}
          />
          <div className={styles.textList}>
            <span className={styles.text}>Privacy Policy</span>
            <span className={styles.text}>FAQ</span>
          </div>
          <div className={styles.snsLogo}>
            <Image src={facebookLogo} alt='코드잇 로고' />
            <Image src={youtuveLogo} alt='코드잇 로고' />
            <Image src={instaLogo} alt='코드잇 로고' />
            <Image src={twitterLogo} alt='코드잇 로고' />
          </div>
        </div>
      </div>
    </>
  );
}
