import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@styles/Footer.module.css";
import facebookIcon from "../images/ic_facebook.svg";
import youtubeIcon from "../images/ic_youtube.svg";
import twitterIcon from "../images/ic_twitter.svg";
import instagramIcon from "../images/ic_instagram.svg";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerCorp}>&#169; codeit - 2024</div>
        <div className={styles.footerPnf}>
          <Link href="/privacy" className={styles.footerPolicy}>
            Privacy Policy
          </Link>
          <Link href="/faq" className={styles.footerFaq}>
            FAQ
          </Link>
        </div>
        <div className={styles.footerSns}>
          <a href="https://www.facebook.com" target="_blank">
            <Image
              className={styles.socialIcon}
              src={facebookIcon}
              alt="페이스북"
              width={20}
              height={20}
            />
          </a>
          <a href="https://www.youtube.com" target="_blank">
            <Image
              className={styles.socialIcon}
              src={youtubeIcon}
              alt="유튜브"
              width={20}
              height={20}
            />
          </a>
          <a href="https://twitter.com" target="_blank">
            <Image
              className={styles.socialIcon}
              src={twitterIcon}
              alt="트위터"
              width={20}
              height={20}
            />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <Image
              className={styles.socialIcon}
              src={instagramIcon}
              alt="인스타"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
