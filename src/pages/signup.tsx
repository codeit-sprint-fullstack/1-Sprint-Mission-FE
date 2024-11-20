import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/signup.module.css";
import { signUp } from "../api/authApi";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateNickname,
} from "../utils/validation";
import SocialLogin from "../components/SocialLogin";
import Modal from "../components/Modal";

interface ErrorMessage {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface TouchedFields {
  email: boolean;
  nickname: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false,
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  const handleBlur = (field: keyof TouchedFields) => {
    let error = "";
    if (field === "email") error = validateEmail(email);
    if (field === "nickname") error = validateNickname(nickname);
    if (field === "password") error = validatePassword(password);
    if (field === "confirmPassword") error = validateConfirmPassword(password, confirmPassword);

    setErrorMessage((prev) => ({ ...prev, [field]: error }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateAllFields = (): boolean => {
    const emailError = validateEmail(email);
    const nicknameError = validateNickname(nickname);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    if (!emailError && !nicknameError && !passwordError && !confirmPasswordError) {
      setIsValid(true);
      return true;
    } else {
      setErrorMessage({
        email: emailError,
        nickname: nicknameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      setIsValid(false);
      return false;
    }
  };

  useEffect(() => {
    validateAllFields();
  }, [email, nickname, password, confirmPassword]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;

    try {
      const response = await signUp(email, nickname, password, confirmPassword);
      console.log("회원가입 성공:", response);

      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("nickname", nickname);
        console.log("닉네임 저장됨:", nickname);
        window.dispatchEvent(new Event("storage"));
        setShowModal(true);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setErrorMessage((prev) => ({ ...prev, email: "사용 중인 이메일입니다." }));
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    router.push("/items");
  };

  return (
    <div>
      <header className={styles.signupHeader}>
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
              onBlur={() => handleBlur("email")}
              placeholder="이메일을 입력해주세요"
              className={`${styles.input} ${touched.email && errorMessage.email ? styles.inputError : ""}`}
              required
            />
            {touched.email && errorMessage.email && (
              <div className={styles.errorMessage}>{errorMessage.email}</div>
            )}
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
              onBlur={() => handleBlur("nickname")}
              placeholder="닉네임을 입력해주세요"
              className={`${styles.input} ${touched.nickname && errorMessage.nickname ? styles.inputError : ""}`}
              required
            />
            {touched.nickname && errorMessage.nickname && (
              <div className={styles.errorMessage}>{errorMessage.nickname}</div>
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
                onBlur={() => handleBlur("password")}
                placeholder="비밀번호를 입력해주세요"
                className={`${styles.input} ${touched.password && errorMessage.password ? styles.inputError : ""}`}
                required
              />
              <img
                src={showPassword ? "/image/invisible.svg" : "/image/visible.svg"}
                alt="비밀번호 가시성 토글"
                className={styles.visibilityIcon}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {touched.password && errorMessage.password && (
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
                onBlur={() => handleBlur("confirmPassword")}
                placeholder="비밀번호를 다시 입력해주세요"
                className={`${styles.input} ${touched.confirmPassword && errorMessage.confirmPassword ? styles.inputError : ""}`}
                required
              />
              <img
                src={showConfirmPassword ? "/image/invisible.svg" : "/image/visible.svg"}
                alt="비밀번호 확인 가시성 토글"
                className={styles.visibilityIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {touched.confirmPassword && errorMessage.confirmPassword && (
              <div className={styles.errorMessage}>{errorMessage.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className={styles.signupButton}
            style={{ backgroundColor: isValid ? "#3692FF" : "#9CA3AF" }}
            disabled={!isValid}
          >
            회원가입
          </button>
        </form>

        <SocialLogin />

        <div className={styles.loginLink}>
          이미 회원이신가요? <a href="/login">로그인</a>
        </div>

        {showModal && <Modal message="가입 완료되었습니다." onConfirm={handleModalConfirm} />}
      </main>
    </div>
  );
};

export default SignupPage;

