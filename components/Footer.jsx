import Link from "next/link";
import faceBookLogo from "../public/images/ic_facebook.png";
import instagramLogo from "../public/images/ic_instagram.png";
import youtubeLogo from "../public/images/ic_youtube.png";
import twitterLogo from "../public/images/ic_twitter.png";
import styles from "@/styles/footer.module.css";
import Image from "next/image";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_box}>
        <p>@codeit - 2024</p>
        <div className={styles.footer_center_box}>
          <Link href="/Privacy">Privacy Policy</Link>
          <Link href="/Faq">FAQ</Link>
        </div>
        <div className={styles.sns_box}>
          <Link href="https://www.facebook.com/" target="_blank">
            <Image
              className={styles.icon}
              src={faceBookLogo}
              alt="페이스북로고"
            />
          </Link>
          <Link href="https://x.com/?lang=ko" target="_blank">
            <Image className={styles.icon} src={twitterLogo} alt="트위터로고" />
          </Link>
          <Link href="https://www.youtube.com/" target="_blank">
            <Image className={styles.icon} src={youtubeLogo} alt="유튜브고" />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <Image
              className={styles.icon}
              src={instagramLogo}
              alt="인스타그램로고"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
