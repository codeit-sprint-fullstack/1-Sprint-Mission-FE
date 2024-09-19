import styles from "./LoginForm.module.css";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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

        <label className={styles.label}>비밀번호</label>
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <Image
            src={isPasswordVisible ? btn_visibility : btn_hide}
            alt="btn_hide"
            className={styles.btn_pw}
            onClick={togglePasswordVisibility}
          />
        </div>

        <button className={styles.loginBtn}>로그인</button>
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
          판다마켓이 처음이신가요?{" "}
          <Link href={ROUTES.SIGNIN} passHref>
            <span className={styles.signinLink}>회원가입</span>
          </Link>
        </p>
      </div>
    </>
  );
}
