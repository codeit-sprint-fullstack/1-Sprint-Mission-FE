import { useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 가시성 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 가시성 상태
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않아요.");
      return;
    }

    const USER_DATA = [{ email: "test@test.com", password: "123456" }];
    const user = USER_DATA.find((user) => user.email === email);

    if (!user || user.password !== password) {
      setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
    } else {
      router.push("/items");
    }
  };

  return (
    <div>
      <header className={styles.loginHeader}>
        <a href="/">
          <img src="/image/login_logo.svg" alt="Panda Logo" />
        </a>
      </header>
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                className={styles.input}
                required
              />
              <img
                src={showPassword ? "/image/invisible.svg" : "/image/visible.svg"}
                alt="Toggle visibility"
                className={styles.visibilityIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              비밀번호 확인
            </label>
            <div className={styles.inputWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력해주세요"
                className={styles.input}
                required
              />
              <img
                src={
                  showConfirmPassword
                    ? "/image/invisible.svg"
                    : "/image/visible.svg"
                }
                alt="Toggle visibility"
                className={styles.visibilityIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
          </div>

          <button type="submit" className={styles.loginButton}>
            로그인
          </button>
        </form>

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

        <div className={styles.signupLink}>
          판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
