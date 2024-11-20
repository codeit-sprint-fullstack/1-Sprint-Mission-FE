import Image from "next/image";
import styles from "./Footer.module.css";
import facebook from "@/images/ic_facebook.png";
import twitter from "@/images/ic_twitter.png";
import youtube from "@/images/ic_youtube.png";
import instagram from "@/images/ic_instagram.png";
import { useRouter } from "next/router";

export function Footer() {
  const router = useRouter();

  return (
    <footer
      className={`${styles.footer} ${
        router.pathname === "/login" || router.pathname === "/signup"
          ? styles.none
          : ""
      }`}
    >
      <div className={styles.footerContainer}>
        <div className={styles.copylight}>@codeit - 2024</div>
        <div className={styles.info}>
          <div>Privacy Policy</div>
          <div>FAQ</div>
        </div>
        <div className={styles.footerSNS}>
          <Image className={styles.sns} src={facebook} alt="facebook" />
          <Image className={styles.sns} src={twitter} alt="twitter" />
          <Image className={styles.sns} src={youtube} alt="youtube" />
          <Image className={styles.sns} src={instagram} alt="instagram" />
        </div>
      </div>
    </footer>
  );
}
