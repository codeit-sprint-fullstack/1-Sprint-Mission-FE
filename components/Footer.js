import footerLogo from '../public/codeit.png';
import facebookIcon from '../public/sns_icon/ic_facebook.png';
import youtuveIcon from '../public/sns_icon/ic_youtuve.png';
import instaIcon from '../public/sns_icon/ic_insta.png';
import twitterIcon from '../public/sns_icon/ic_twitter.png';
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
            <Image src={facebookIcon} alt='코드잇 로고' />
            <Image src={twitterIcon} alt='트위터 로고' />
            <Image src={youtuveIcon} alt='유튜브 로고' />
            <Image src={instaIcon} alt='인스타 로고' />
          </div>
        </div>
        <Image
          src={footerLogo}
          alt='코드잇 로고'
          className={styles.codeitLogoMobile}
        />
      </div>
    </>
  );
}
