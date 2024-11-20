import styles from "./Footer.module.css";
import Image from "next/image";
import facebook from "@/images/SNS/facebook.png";
import twitter from "@/images/SNS/twitter.png";
import youtube from "@/images/SNS/youtube.png";
import instagram from "@/images/SNS/instagram.png";

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
          <Image className={styles.sns} src={facebook} alt="facebook" />
          <Image className={styles.sns} src={twitter} alt="twitter" />
          <Image className={styles.sns} src={youtube} alt="youtube" />
          <Image className={styles.sns} src={instagram} alt="instagram" />
        </div>
      </div>
      <div className={styles.footerCopyrightM}>@codeit - 2024</div>
    </footer>
  );
}
