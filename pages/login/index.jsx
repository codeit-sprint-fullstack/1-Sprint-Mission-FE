import React from "react";
import styles from "./index.module.css";
import SocialLogin from "@/components/common/SocialLogin";
import Image from "next/image";
import AuthForm from "@/components/common/AuthForm";

const login = () => {
  React.useEffect(() => {
    document.body.classList.add("no-gnb-margin");
    return () => {
      document.body.classList.remove("no-gnb-margin");
    };
  }, []);

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

      <AuthForm mode="login" />
      <SocialLogin />
      <div className={styles.noticeText}>
        판다마켓이 처음이신가요?{" "}
        <a href="/register" className={styles.link}>
          회원가입
        </a>
      </div>
    </div>
  );
};

export default login;
