import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <span className={styles.footer_copyright}>ⓒcodeit - 2024</span>
        <div className={styles.footer_information}>
          <span className={styles.footer_policy}>Privacy Policy </span>
          <span className={styles.footet_faq}>FAQ</span>
        </div>
        <div className={styles.footer_sns_container}>
          <Link href="https://facebook.com" target="_blank">
            <Image
              src="/ic_facebook.png"
              alt="Facebook_icon"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://x.com" target="_blank">
            <Image
              src="/ic_twitter.png"
              alt="Twitter_icon"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <Image
              src="/ic_youtube.png"
              alt="Youtube_icon"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Image
              src="/ic_instagram.png"
              alt="Instagram_icon"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
