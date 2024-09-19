import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import styles from "./CreateAccount.module.css"; // CSS 모듈 임포트

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        <form className={styles.form}>
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
          </div>

          <button className={styles.button} type="submit">
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
