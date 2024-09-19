import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import styles from "./CreateAccount.module.css"; // CSS 모듈 임포트
import {
  validateEmail,
  validatePassword,
  validatename,
} from "../lib/vaildate_function.mjs"; // 유효성 검사 함수 임포트

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 에러 초기화
    setEmailError("");
    setNameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      setEmailError("유효한 이메일을 입력해 주세요.");
    }

    // 닉네임 유효성 검사
    if (!validatename(name)) {
      setNameError("닉네임은 한글로만 작성해 주세요.");
    }

    // 비밀번호 유효성 검사
    if (!validatePassword(password)) {
      setPasswordError(
        "비밀번호는 숫자, 소문자, 특수문자가 포함되어야 합니다."
      );
    } else if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    }

    // 비밀번호 확인 유효성 검사
    if (confirmPassword !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    }

    // 모든 유효성 검사 통과 시
    if (
      validateEmail(email) &&
      validatename(name) &&
      validatePassword(password) &&
      password.length >= 8 &&
      confirmPassword === password
    ) {
      console.log("회원가입 요청:", { email, name, password });
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/img_login_panda_logo.png"
            alt="Panda Logo"
            layout="fixed"
            width={396}
            height={132}
            className={styles.logo}
          />
        </div>
      </header>

      <div className={styles.form_box}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.label}>이메일</label>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className={styles.error}>{emailError}</p>}{" "}
          {/* 이메일 에러 메시지 */}
          <label className={styles.label}>닉네임</label>
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && <p className={styles.error}>{nameError}</p>}{" "}
          {/* 닉네임 에러 메시지 */}
          <label className={styles.label}>비밀번호</label>
          <div className={styles.ps_confirm}>
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            {/* 비밀번호 에러 메시지 */}
          </div>
          <label className={styles.label}>비밀번호 확인</label>
          <div className={styles.ps_confirm}>
            <input
              className={styles.input}
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPasswordError && (
              <p className={styles.error}>{confirmPasswordError}</p>
            )}
            {/* 비밀번호 확인 에러 메시지 */}
          </div>
          <button
            className={styles.button}
            type="submit"
            disabled={isButtonDisabled}
          >
            회원가입
          </button>
        </form>

        <div className={styles.easy_login_box}>
          <div className={styles.easy_text}>간편 로그인하기</div>
          <div className={styles.sns}>
            <a href="https://www.google.com/" target="google">
              <Image
                src="/images/google.png"
                alt="구글"
                width={42}
                height={42}
              />
            </a>
            <a href="https://www.kakaocorp.com/page/" target="kakaotalk">
              <Image
                src="/images/kakaotalk.png"
                alt="카카오톡"
                width={42}
                height={42}
              />
            </a>
          </div>
        </div>

        <div className={styles.first_ingayo}>
          이미 회원이신가요?
          <Link href="/login" className={styles.loginLink}>
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
}
