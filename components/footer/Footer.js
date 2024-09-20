import Image from "next/image";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <>
      <div className={styles.FooterContainer}>
        <div className={styles.FooterContent}>
          <p className={styles.FooterTitle}>@codeit - 2024</p>
          <div className={styles.FooterMenu}>
            <p>Privacy Policy</p>
            <p>FAQ</p>
          </div>
          <div className={styles.FooterIcon}>
            <Image src="/facebook.svg" alt="logo" width={20} height={20} />
            <Image src="/twitter.svg" alt="logo" width={20} height={20} />
            <Image src="/youtube.svg" alt="logo" width={20} height={20} />
            <Image src="/instagram.svg" alt="logo" width={20} height={20} />
          </div>
        </div>
      </div>
    </>
  );
}
