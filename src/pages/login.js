import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import { signIn } from "../api/authApi";
import SocialLogin from "../components/SocialLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const isButtonActive = email && password;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signIn(email, password);
      console.log("로그인 응답 데이터:", response);

      // 로그인 후 accessToken 및 nickname 저장
      if (response.accessToken && response.nickname) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("nickname", response.nickname);
        console.log("닉네임 저장 완료:", response.nickname);

        window.dispatchEvent(new Event("storage"));
        router.push("/items");
      } else {
        console.error("로그인 응답에 닉네임 또는 accessToken이 없습니다.");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
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
              className={`${styles.input} ${
                errorMessage ? styles.inputError : ""
              }`}
              required
            />
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
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
                className={`${styles.input} ${
                  errorMessage ? styles.inputError : ""
                }`}
                required
              />
              <img
                src={
                  showPassword ? "/image/invisible.svg" : "/image/visible.svg"
                }
                alt="비밀번호 가시성 토글"
                className={styles.visibilityIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            style={{ backgroundColor: isButtonActive ? "#3692FF" : "#9CA3AF" }}
            disabled={!isButtonActive}
          >
            로그인
          </button>
        </form>

        <SocialLogin />

        <div className={styles.signupLink}>
          판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

