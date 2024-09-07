import React from "react";
import styles from "./Footer.module.css";

import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <section className={styles.contentSection}>
        <div className={styles.copyright}>
          <p>©codeit - 2024</p>
        </div>
        <div className={styles.contentMenu}>
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </div>
        <div className={styles.iconSNS}>
          <img src="/images/icon/ic_facebook.png" alt="facebook" />
          <img src="/images/icon/ic_twitter.png" alt="twitter" />
          <img src="/images/icon/ic_youtube.png" alt="youtube" />
          <img src="/images/icon/ic_instagram.png" alt="instagram" />
        </div>
      </section>
    </footer>
  );
}

export default Footer;
