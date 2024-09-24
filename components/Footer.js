// components/Footer.js
import React from "react";
import Image from "next/image"; // Next.js의 Image 컴포넌트 사용
import Link from "next/link"; // Next.js의 Link 컴포넌트 사용
import styles from "./Footer.module.css"; // CSS Module을 사용하여 스타일링

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>©codeit - 2024</div>
      <div className={styles.footerMenu}>
        <a href="/privacy">Privacy Policy</a>{" "}
        {/* Next.js의 라우팅 시스템에 맞게 수정 */}
        <a href="/faq">FAQ</a> {/* Next.js의 라우팅 시스템에 맞게 수정 */}
      </div>
      <div className={styles.socialMedia}>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="facebook-logo.svg"
            alt="페이스북"
            width={20}
            height={20}
          />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="twitter-logo.svg" alt="트위터" width={20} height={20} />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="youtube-logo.svg" alt="유튜브" width={20} height={20} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="instagram-logo.svg"
            alt="인스타그램"
            width={20}
            height={20}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
