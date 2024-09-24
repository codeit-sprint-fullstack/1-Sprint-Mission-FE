import styles from "@/styles/login.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm.js";
export default function Login() {
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <div className={styles.logoImg}>
            <Image src="./logo.svg" alt="logo" fill={true} />
          </div>
          <LoginForm />
          <div className={styles.simpleLogin}>
            <p>간편 로그인하기</p>
            <div className={styles.loginIcon}>
              <a className={styles.googleLogin}>
                <Image src="./google.svg" alt="google" width={42} height={42} />
              </a>
              <a className={styles.kakaoLogin}>
                <Image src="./kakao.svg" alt="kakao" width={42} height={42} />
              </a>
            </div>
          </div>
          <p className={styles.fromFooter}>
            판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
          </p>
        </div>
      </div>
    </>
  );
}
