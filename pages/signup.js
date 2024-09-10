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
  validationCompare,
} from "@utils/validation";

// 컴포넌트
import InputBar from "@components/common/InputBar";
import InputBarPassword from "@components/common/InputBarPassword";
import BtnRound from "@components/common/BtnRound";

function SignUp() {
  // input 값
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //에러 상태
  const [emailInputError, setEmailInputError] = useState(false);
  const [nicknameInputError, setNicknameInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [confirmPasswordInputError, setConfirmPasswordInputError] =
    useState(false);

  // 최종 가능 여부
  const [ableSubmit, setAbleSubmit] = useState(false);

  // 가입 버튼 활성화 여부 관리
  useEffect(() => {
    if (email && nickname && password && confirmPassword) {
      setAbleSubmit(
        validationSubmit(
          emailInputError,
          nicknameInputError,
          passwordInputError,
          confirmPasswordInputError
        )
      );
    }
  }, [
    emailInputError,
    nicknameInputError,
    passwordInputError,
    confirmPasswordInputError,
  ]);

  // OnChange 핸들
  const handleEmailOnChange = (e) => {
    setEmailInputError(validationEmail(e.target.value));
    setEmail(e.target.value);
  };

  const handleNicknameOnChnage = (e) => {
    setNicknameInputError(validationMinLength(e.target.value, 2));
    setNickname(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPasswordInputError(validationMinLength(e.target.value, 8));
    setPassword(e.target.value);
  };

  const handleConfirmPasswordOnChange = (e) => {
    setConfirmPasswordInputError(validationCompare(e.target.value, password));
    setConfirmPassword(e.target.value);
  };

  // Onblur 핸들
  const handleCommonOnblur = (e) => {
    setNicknameInputError(validationMinLength(e.target.value, 2));
  };

  return (
    <>
      <Head>
        <title>판다마켓 - 회원가입</title>
      </Head>

      <main>
        <div className={styles.logoBox}>
          <Link href="/">
            <img src="/images/logo/logo_big.svg" alt="logo" />
          </Link>
        </div>
        <section className={styles.inputSection}>
          <InputBar
            headerText="이메일"
            placeholder="이메일을 입력해 주세요"
            type="email"
            onChange={handleEmailOnChange}
            inputError={emailInputError}
            validationMessage="잘못된 이메일 형식입니다."
          />
          <InputBar
            headerText="닉네임"
            placeholder="닉네임을 입력해 주세요"
            onChange={handleNicknameOnChnage}
            inputError={nicknameInputError}
            validationMessage="닉네임을 2글자 이상 설정해주세요"
          />
          <InputBarPassword
            headerText="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            onChange={handlePasswordOnChange}
            onBlur={handleCommonOnblur}
            inputError={passwordInputError}
            validationMessage="비밀번호를 8자 이상 입력해주세요"
          />
          <InputBarPassword
            headerText="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
            onChange={handleConfirmPasswordOnChange}
            onBlur={handleCommonOnblur}
            inputError={confirmPasswordInputError}
            validationMessage="비밀번호가 일치하지 않습니다."
          />
          <div className={styles.btnSizeControl}>
            <BtnRound innerText="회원가입" active={ableSubmit} />
          </div>
          <section className={styles.snsLoginContainer}>
            <span>간편 로그인하기</span>
            <div className={styles.snsIconContainer}>
              <img src="/images/icon_sns/ic_google.svg" />
              <img src="/images/icon_sns/ic_kakao.svg" />
            </div>
          </section>
          <div className={styles.bottomText}>
            <span>이미 회원이신가요?</span>
            <>&nbsp;</>
            <Link href="/signup" className={styles.link}>
              로그인
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default SignUp;
