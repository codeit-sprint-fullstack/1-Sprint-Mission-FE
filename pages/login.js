import React, { useState } from "react";
import styles from "./login.module.css";

//Next 기능
import Head from "next/head";
import Link from "next/link";

// 컴포넌트
import InputBar from "@components/common/InputBar";
import InputBarPassword from "@components/common/InputBarPassword";
import BtnRound from "@components/common/BtnRound";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordInputError, setPasswordInputError] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);

  const [ableLogin, setAbleLogin] = useState(false);

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordOnchange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailOnBlur = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordOnblur = (e) => {
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
            onBlur={handleEmailOnBlur}
          />
          <InputBarPassword
            headerText="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={handlePasswordOnchange}
            onBlur={handlePasswordOnblur}
          />
          <div className={styles.btnSizeControl}>
            <BtnRound innerText="로그인" active={ableLogin} />
          </div>
          <section className={styles.loginOnSns}></section>
          <span>
            판다마켓이 처음이신가요?{" "}
            <Link href="/signup">
              <span>회원가입</span>
            </Link>
          </span>
        </section>
      </main>
    </>
  );
}

export default Login;
