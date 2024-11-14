import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInfo}>
        <div className={styles.footerCopyright}>@codeit - 2024</div>
        <div className={styles.footerLinks}>
          <div className={styles.link}>Privacy Policy</div>
          <div className={styles.link}>FAQ</div>
        </div>
        <div className={styles.footerSNS}>
          <Image
            className={styles.sns}
            src="/facebook.png"
            alt="facebook"
            width={40}
            height={40}
          />
          <Image
            className={styles.sns}
            src="/twitter.png"
            alt="twitter"
            width={40}
            height={40}
          />
          <Image
            className={styles.sns}
            src="/youtube.png"
            alt="youtube"
            width={40}
            height={40}
          />
          <Image
            className={styles.sns}
            src="/instagram.png"
            alt="instagram"
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className={styles.footerCopyrightM}>@codeit - 2024</div>
    </footer>
  );
}
