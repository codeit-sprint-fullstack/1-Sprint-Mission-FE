import React, { useState, useEffect } from "react";
import styles from "./login.module.css";

//Next 기능
import Head from "next/head";
import Link from "next/link";

// 유틸 함수
import {
  validationMinLength,
  validationEmail,
  validationSubmit,
} from "@utils/validation";

// 컴포넌트
import InputBar from "@components/common/InputBar";
import InputBarPassword from "@components/common/InputBarPassword";
import BtnRound from "@components/common/BtnRound";

function Login() {
  // input 값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //에러 상태
  const [emailInputError, setEmailInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);

  // 최종 가능 여부
  const [ableLogin, setAbleLogin] = useState(false);

  useEffect(() => {
    if (email && password) {
      console.log(`email: ${email}, password: ${password}`);
      console.log(`ableLogin: ${ableLogin}`);
      console.log(
        `emailInputError: ${emailInputError}, passwordInputError: ${passwordInputError}`
      );
      console.log(
        `validationSubmit(emailInputError, passwordInputError): ${validationSubmit(
          emailInputError,
          passwordInputError
        )}`
      );
      setAbleLogin(validationSubmit(emailInputError, passwordInputError));
    }
  }, [emailInputError, passwordInputError]);

  // 로그인 버튼 활성화 여부 관리
  const handleEmailOnChange = (e) => {
    setEmailInputError(validationEmail(e.target.value));
    setEmail(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPasswordInputError(validationMinLength(e.target.value, 8));
    setPassword(e.target.value);
  };

  return (
    <>
      <Head>
        <title>판다마켓 - 로그인</title>
      </Head>

      <main>
        <div className={styles.logoBox}>
          <img src="/images/logo/logo_big.svg" alt="logo" />
        </div>
        <section className={styles.inputSection}>
          <InputBar
            headerText="이메일"
            placeholder="이메일을 입력해 주세요"
            type="email"
            value={email}
            onChange={handleEmailOnChange}
            inputError={emailInputError}
            validationMessage="잘못된 이메일 형식입니다."
          />
          <InputBarPassword
            headerText="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={handlePasswordOnChange}
            inputError={passwordInputError}
            validationMessage="비밀번호를 8자 이상 입력해주세요"
          />
          <div className={styles.btnSizeControl}>
            <BtnRound innerText="로그인" active={ableLogin} />
          </div>
          <section className={styles.snsLoginContainer}>
            <span>간편 로그인하기</span>
            <div className={styles.snsIconContainer}>
              <img src="/images/icon_sns/ic_google.svg" />
              <img src="/images/icon_sns/ic_kakao.svg" />
            </div>
          </section>
          <div className={styles.bottomText}>
            <span>판다마켓이 처음이신가요?</span>
            <>&nbsp;</>
            <Link href="/signup" className={styles.link}>회원가입</Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
