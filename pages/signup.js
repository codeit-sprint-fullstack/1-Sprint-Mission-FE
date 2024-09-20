import styles from "@/styles/signup.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { postsignup } from "./api/user";
import SignupForm from "../component/SignupForm.js";

export default function Signup() {
  return (
    <>
      <div className={styles.signupContainer}>
        <div className={styles.signupForm}>
          <div className={styles.logoImg}>
            <Image src="./logo.svg" alt="logo" fill={true} />
          </div>
          <SignupForm />

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
          <p className={styles.formfooter}>
            이미 회원이신가요? <a href="/">로그인</a>
          </p>
        </div>
      </div>
    </>
  );
}
