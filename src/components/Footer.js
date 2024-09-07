import Image from "next/image";
import styles from "./Footer.module.css"; // CSS 모듈 파일 경로

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.codeit_icon}>©codeit - 2024</div>
        <div className={styles.footer_menu}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className={styles.sns_icon}>
          <a href="/facebook">
            <Image
              src="/images/ic_facebook.png"
              alt="FACEBOOK"
              width={20}
              height={20}
            />
          </a>
          <a href="/twitter">
            <Image
              src="/images/ic_twitter.png"
              alt="TWITTER"
              width={20}
              height={20}
            />
          </a>
          <a href="/youtube">
            <Image
              src="/images/ic_youtube.png"
              alt="YOUTUBE"
              width={20}
              height={20}
            />
          </a>
          <a href="/instagram">
            <Image
              src="/images/ic_instagram.png"
              alt="INSTAGRAM"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
