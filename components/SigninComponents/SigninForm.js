import styles from "./SigninForm.module.css";
import Image from "next/image";
import logoImg from "@/images/desktop_logo.png";
import ic_google from "@/images/ic_google.png";
import ic_kakao from "@/images/ic_kakao.png";
import btn_visibility from "@/images/btn_visibility.png";
import btn_hide from "@/images/btn_hide.png";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { useState } from "react";
export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmVisible(!isConfirmVisible);
  };
  return (
    <>
      <Link href={ROUTES.HOME} passHref>
        <Image src={logoImg} alt="logo" className={styles.logo} />
      </Link>
      <form className={styles.loginForm}>
        <label className={styles.label}>이메일</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
        />
        <label className={styles.label}>닉네임</label>
        <input
          className={styles.input}
          type="text"
          name="text"
          placeholder="닉네임를 입력해주세요"
        />
        <label className={styles.label}>비밀번호</label>
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <Image
            src={isVisible ? btn_visibility : btn_hide}
            alt="btn_hide"
            className={styles.btn_pw}
            onClick={togglePasswordVisibility}
          />
        </div>
        <label className={styles.label}>비밀번호 확인</label>
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={isConfirmVisible ? "text" : "password"}
            name="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
          />
          <Image
            src={isConfirmVisible ? btn_visibility : btn_hide}
            alt="btn_hide"
            className={styles.btn_pw}
            onClick={toggleConfirmPasswordVisibility}
          />
        </div>
        <button className={styles.loginBtn}>회원가입</button>
      </form>
      <div className={styles.easyLogin}>
        <p className={styles.easyLoginText}>간편로그인하기</p>
        <div className={styles.easyLoginImg}>
          <Image className={styles.img} src={ic_google} alt="google" />
          <Image className={styles.img} src={ic_kakao} alt="kakao" />
        </div>
      </div>
      <div className={styles.signinContainer}>
        <p className={styles.signinText}>
          이미 회원이신가요?{" "}
          <Link href={ROUTES.LOGIN} passHref>
            <span className={styles.signinLink}>로그인</span>
          </Link>
        </p>
      </div>
    </>
  );
}
