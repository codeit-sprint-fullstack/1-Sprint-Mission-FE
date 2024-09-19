import styles from "@/styles/login.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function Login() {
  const [emailErrorCode, setemailErrorCode] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorCode, setpasswordErrorCode] = useState("");
  const [btnCheck, setBtnCheck] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const passwordToggleHandler = () => {
    setShowpassword(!showpassword);
  };

  const emailHandler = (e) => {
    if (!validateEmail(e.target.value) && e.target.value.length > 0) {
      setEmailError(true);
      setemailErrorCode("잘못된 이메일입니다.");
      setBtnCheck(false);
    } else {
      setEmailError(false);
      setemailErrorCode("");
      if (passwordError && emailError) {
        setBtnCheck(true);
      } else {
        setBtnCheck(false);
      }
    }
  };
  const passwordHandler = (e) => {
    if (e.target.value.length < 8 && e.target.value.length > 0) {
      setPasswordError(true);
      setpasswordErrorCode("비밀번호를 8자 이상 입력해주세요");
      setBtnCheck(false);
    } else {
      setPasswordError(false);
      setpasswordErrorCode("");
      if (emailError && passwordError) {
        setBtnCheck(false);
      } else {
        setBtnCheck(true);
      }
    }
  };
  return (
    <>
      <div className={styles.loginContainer}>
        <from className={styles.loginForm}>
          <div className={styles.logoImg}>
            <Image src="./logo.svg" alt="logo" fill={true} />
          </div>
          <div className={styles.inputFrom}>
            <p>이메일</p>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              className={styles.inputEmail}
              onChange={emailHandler}
            ></input>
            {emailError && <p className={styles.error}>{emailErrorCode}</p>}
          </div>
          <div className={styles.inputFrom}>
            <p>비밀번호</p>
            <input
              type={showpassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              className={styles.inputPassword}
              onChange={passwordHandler}
            ></input>
            <span
              className={styles.passwordToggle}
              onClick={passwordToggleHandler}
            >
              {showpassword ? (
                <Image
                  src="./eyeClose.svg"
                  alt="Close"
                  width={24}
                  height={24}
                />
              ) : (
                <Image src="./eyeOpen.svg" alt="Oepn" width={24} height={24} />
              )}
            </span>
          </div>

          {passwordError && <p className={styles.error}>{passwordErrorCode}</p>}
          {btnCheck ? (
            <button type="button" className={styles.loginBtn2}>
              로그인
            </button>
          ) : (
            <button type="button" className={styles.loginBtn}>
              로그인
            </button>
          )}

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
            판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
          </p>
        </from>
      </div>
    </>
  );
}
