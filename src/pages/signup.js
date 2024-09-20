import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/signup.module.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();

    const USER_DATA = [
      { email: "test@test.com", nickname: "testuser", password: "123456" },
    ];
    const emailExists = USER_DATA.some((user) => user.email === email);

    if (emailExists) {
      alert("사용 중인 이메일입니다.");
    } else {
      router.push("/login"); // 회원가입 성공 시 로그인 페이지로 이동
    }
  };

  return (
    <div>
      <header className={styles.signupHeader}>
        <a href="/">
          <img src="/image/login_logo.svg" alt="Panda Logo" />
        </a>
      </header>
      <main className={styles.main}>
        <form onSubmit={handleSignup}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nickname" className={styles.label}>
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirm-password" className={styles.label}>
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateConfirmPassword}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              className={styles.input}
              required
            />
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
          </div>

          <button type="submit" className={styles.signupButton}>
            회원가입
          </button>
        </form>

        {/* 간편 로그인하기 섹션 */}
        <div className={styles.socialLogin}>
          <span>간편 로그인하기</span>
          <div className={styles.socialIcons}>
            <a href="https://www.google.com/" className={styles.googleLogin}>
              <img src="/image/google.svg" alt="Google Login" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              className={styles.kakaoLogin}
            >
              <img src="/image/kakao.svg" alt="Kakao Login" />
            </a>
          </div>
        </div>

        <div className={styles.loginLink}>
          이미 회원이신가요? <a href="/login">로그인</a>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;

