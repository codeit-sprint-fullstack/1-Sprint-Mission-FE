import styles from "./LoginForm.module.css";
import Image from "next/image";
import logoImg from "@/images/desktop_logo.png";
import ic_google from "@/images/ic_google.png";
import ic_kakao from "@/images/ic_kakao.png";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
export default function LoginForm() {
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
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
        />
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
