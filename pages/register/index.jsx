import React from "react";
import styles from "./index.module.css";
import SocialLogin from "@/components/common/SocialLogin";
import Image from "next/image";
import AuthForm from "@/components/common/AuthForm";

const register = () => {
  return (
    <div className={styles.Container}>
      <a href="/">
        <Image
          src="/images/loginLogo.svg"
          alt="Icon"
          width={400}
          height={130}
          className={styles.loginLogo}
        />
      </a>
      <AuthForm mode="register" />
      <SocialLogin />
      <div className={styles.noticeText}>
        이미 회원이신가요?{" "}
        <a href="/login" className={styles.link}>
          로그인
        </a>
      </div>
    </div>
  );
};

export default register;
