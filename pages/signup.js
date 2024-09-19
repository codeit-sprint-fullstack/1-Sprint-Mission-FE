import styles from "@/styles/signup.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Signup() {
  const [showpassword1, setShowpassword1] = useState(false);
  const [showpassword2, setShowpassword2] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorCode, setemailErrorCode] = useState("");
  const [btnCheck, setBtnCheck] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [nameErrorCode, setNameErrorCode] = useState("");
  const [password1Error, setPassword1Error] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [password1ErrorCode, setPassword1ErrorCode] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const [password2ErrorCode, setPassword2ErrorCode] = useState("");
  const [password2Data, setPassword2Data] = useState("");

  const passwordToggleHandler1 = () => {
    setShowpassword1(!showpassword1);
  };
  useEffect(() => {
    if (emailError || nameError || password1Error || password2Error) {
      setBtnCheck(false);
    } else {
      setBtnCheck(true);
    }
  }, [emailError, nameError, password1Error, password2Error]);
  useEffect(() => {
    if (passwordData !== password2Data) {
      setPassword2Error(true);
      setPassword2ErrorCode("비밀번호가 일치하지 않습니다.");
    }
  }, [password1Error]);

  const passwordToggleHandler2 = () => {
    setShowpassword2(!showpassword2);
  };
  const password1Handler = (e) => {
    setPasswordData(e.target.value);
    if (e.target.value.length >= 8) {
      setPassword1Error(false);
      setPassword1ErrorCode("");
    } else {
      setPassword1Error(true);
      setPassword1ErrorCode("비밀번호를 8자 이상 입력해주세요");
    }
  };
  const password2Handler = (e) => {
    setPassword2Data(e.target.value);
    if (e.target.value === passwordData) {
      setPassword2Error(false);
      setPassword2ErrorCode("");
    } else {
      setPassword2Error(true);
      setPassword2ErrorCode("비밀번호가 일치하지 않습니다.");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const nameHandler = (e) => {
    if (e.target.value.length >= 2) {
      setNameError(false);
      setNameErrorCode("");
    } else {
      setNameError(true);
      setNameErrorCode("2글자 이상 작성해주세요");
    }
  };
  const emailHandler = (e) => {
    if (!validateEmail(e.target.value) && e.target.value.length >= 0) {
      setEmailError(true);
      setemailErrorCode("잘못된 이메일입니다.");
    } else {
      setEmailError(false);
      setemailErrorCode("");
      // if (passwordError && emailError) {
      //   setBtnCheck(true);
      // } else {
      //   setBtnCheck(false);
      // }
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
              type="eamil"
              placeholder="이메일을 입력해주세요"
              className={styles.inputEmail}
              onChange={emailHandler}
            ></input>
            {emailError && <p className={styles.error}>{emailErrorCode}</p>}
          </div>
          <div className={styles.inputFrom}>
            <p>닉네임</p>
            <input
              type="text"
              placeholder="닉네임 입력해주세요"
              className={styles.inputName}
              onChange={nameHandler}
            ></input>
            {nameError && <p className={styles.error}>{nameErrorCode}</p>}
          </div>
          <div className={styles.inputFrom1}>
            <p>비밀번호</p>
            <input
              type={showpassword1 ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              className={styles.inputPassword}
              onChange={password1Handler}
            ></input>

            <span
              className={styles.passwordToggle}
              onClick={passwordToggleHandler1}
            >
              {showpassword1 ? (
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
          {password1Error && (
            <p className={styles.error}>{password1ErrorCode}</p>
          )}
          <div className={styles.inputFrom2}>
            <p>비밀번호 확인</p>
            <input
              type={showpassword2 ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              className={styles.inputPassword}
              onChange={password2Handler}
            ></input>
            <span
              className={styles.passwordToggle}
              onClick={passwordToggleHandler2}
            >
              {showpassword2 ? (
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
          {password2Error && (
            <p className={styles.error}>{password2ErrorCode}</p>
          )}
          {btnCheck ? (
            <button type="button" className={styles.loginBtn2}>
              회원가입
            </button>
          ) : (
            <button type="button" className={styles.loginBtn}>
              회원가입
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
            이미 회원이신가요? <a href="/">로그인</a>
          </p>
        </from>
      </div>
    </>
  );
}
