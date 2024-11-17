import React from "react";
import styles from "./SocialLogin.module.css";
import Image from "next/image";

export default function SocialLogin() {
  return (
    <div className={styles.container}>
      <div className={styles.headText}>간편 로그인하기</div>
      <div className={styles.imageHug}>
        <a
          href="https://www.kakaocorp.com/page"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/ic_kakao.svg"
            alt="카카오 로그인"
            width={42}
            height={42}
          />
        </a>
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/ic_google.svg"
            alt="구글 로그인"
            width={42}
            height={42}
          />
        </a>
      </div>
    </div>
  );
}
