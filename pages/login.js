import React from "react";
import styles from "./login.module.css";

//Next 기능
import Head from "next/head";
import Link from "next/link";

// 컴포넌트
import InputBar from "@components/common/InputBar";
import BtnRound from "@components/common/BtnRound";

function Login() {
  return (
    <>
      <Head>
        <title>판다마켓 - 로그인</title>
      </Head>
      <main>
        <section className={styles.mainContainer}>
          <InputBar headerText="이메일" placeholder="이메일을 입력해 주세요" />
          <InputBar
            headerText="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
          />
          <div className={styles.btnSizeControl}>
            <BtnRound innerText="로그인" active={false}/>
          </div>
          <section className={styles.loginOnSns}></section>
          <p>
            판다마켓이 처음이신가요? <Link href="/signup">회원가입</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default Login;
