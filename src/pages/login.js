import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import { validateEmail, validatePassword, validateConfirmPassword } from "../utils/validation"; // 유효성 검사 불러오기

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 가시성 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 가시성 상태
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [focusedField, setFocusedField] = useState(""); // 현재 포커스된 필드 상태
  const router = useRouter();

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });

    if (field === "email") {
      const emailError = validateEmail(email);
      setErrorMessage((prev) => ({ ...prev, email: emailError }));
    }

    if (field === "password") {
      const passwordError = validatePassword(password);
      setErrorMessage((prev) => ({ ...prev, password: passwordError }));
    }

    if (field === "confirmPassword") {
      const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
      setErrorMessage((prev) => ({ ...prev, confirmPassword: confirmPasswordError }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: "비밀번호가 일치하지 않습니다",
      }));
      return;
    }

    const USER_DATA = [{ email: "test@test.com", password: "123456" }];
    const user = USER_DATA.find((user) => user.email === email);

    if (!user || user.password !== password) {
      setErrorMessage((prev) => ({
        ...prev,
        email: "이메일 또는 비밀번호가 일치하지 않습니다.",
      }));
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
              className={`${styles.input} ${
                touched.email && errorMessage.email ? styles.inputError : ""
              }`}
              onBlur={() => handleBlur("email")}
              onFocus={() => setFocusedField("email")}
              style={{
                borderColor:
                  focusedField === "email"
                    ? "#3692FF"
                    : errorMessage.email
                    ? "#F74747"
                    : "#E5E7EB",
              }}
              required
            />
            {errorMessage.email && (
              <div className={styles.errorMessage}>{errorMessage.email}</div>
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
                  touched.password && errorMessage.password ? styles.inputError : ""
                }`}
                onBlur={() => handleBlur("password")}
                onFocus={() => setFocusedField("password")}
                style={{
                  borderColor:
                    focusedField === "password"
                      ? "#3692FF"
                      : errorMessage.password
                      ? "#F74747"
                      : "#E5E7EB",
                }}
                required
              />
              <img
                src={showPassword ? "/image/invisible.svg" : "/image/visible.svg"}
                alt="Toggle visibility"
                className={styles.visibilityIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errorMessage.password && (
              <div className={styles.errorMessage}>{errorMessage.password}</div>
            )}
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
                className={`${styles.input} ${
                  touched.confirmPassword && errorMessage.confirmPassword
                    ? styles.inputError
                    : ""
                }`}
                onBlur={() => handleBlur("confirmPassword")}
                onFocus={() => setFocusedField("confirmPassword")}
                style={{
                  borderColor:
                    focusedField === "confirmPassword"
                      ? "#3692FF"
                      : errorMessage.confirmPassword
                      ? "#F74747"
                      : "#E5E7EB",
                }}
                required
              />
              <img
                src={showConfirmPassword ? "/image/invisible.svg" : "/image/visible.svg"}
                alt="Toggle visibility"
                className={styles.visibilityIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {errorMessage.confirmPassword && (
              <div className={styles.errorMessage}>
                {errorMessage.confirmPassword}
              </div>
            )}
          </div>

          <button type="submit" className={styles.loginButton}>
            로그인
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

        <div className={styles.signupLink}>
          판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

