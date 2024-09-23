import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/signup.module.css";
import { signUp } from "../api/authApi"; // 회원가입 API 함수 불러오기
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateNickname,
} from "../utils/validation";
import SocialLogin from "../components/SocialLogin";
import Modal from "../components/Modal";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false,
  }); // 입력 필드가 한 번 클릭된 상태인지 확인
  const [isValid, setIsValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // 입력 필드가 포커스를 잃을 때 유효성 검사를 실행하는 함수
  const handleBlur = (field) => {
    let error = "";
    if (field === "email") {
      error = validateEmail(email);
    } else if (field === "nickname") {
      error = validateNickname(nickname);
    } else if (field === "password") {
      error = validatePassword(password);
    } else if (field === "confirmPassword") {
      error = validateConfirmPassword(password, confirmPassword);
    }

    setErrorMessage((prev) => ({ ...prev, [field]: error }));
    setTouched((prev) => ({ ...prev, [field]: true })); // 해당 필드가 클릭되었음을 표시
  };

  const validateAllFields = () => {
    const emailError = validateEmail(email);
    const nicknameError = validateNickname(nickname);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );

    if (
      !emailError &&
      !nicknameError &&
      !passwordError &&
      !confirmPasswordError
    ) {
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

  // 모든 입력 필드가 변경될 때마다 유효성 검사 수행
  useEffect(() => {
    validateAllFields();
  }, [email, nickname, password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 유효성 검사
    if (!isValid) return;

    try {
      // 회원가입 API 호출
      const response = await signUp(email, nickname, password, confirmPassword);
      console.log("회원가입 성공:", response);

      // 회원가입 성공 시 닉네임 저장 및 모달 표시
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("nickname", nickname);
        console.log("닉네임 저장됨:", nickname);
        window.dispatchEvent(new Event("storage")); // 닉네임 상태 갱신을 위해 storage 이벤트 트리거
        setShowModal(true);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setErrorMessage((prev) => ({
        ...prev,
        email: "사용 중인 이메일입니다.",
      }));
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
              onBlur={() => handleBlur("email")} // 포커스 잃을 때 유효성 검사
              placeholder="이메일을 입력해주세요"
              className={`${styles.input} ${
                touched.email && errorMessage.email ? styles.inputError : ""
              }`}
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
              onBlur={() => handleBlur("nickname")} // 포커스 잃을 때 유효성 검사
              placeholder="닉네임을 입력해주세요"
              className={`${styles.input} ${
                touched.nickname && errorMessage.nickname
                  ? styles.inputError
                  : ""
              }`}
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
                className={`${styles.input} ${
                  touched.password && errorMessage.password
                    ? styles.inputError
                    : ""
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
                className={`${styles.input} ${
                  touched.confirmPassword && errorMessage.confirmPassword
                    ? styles.inputError
                    : ""
                }`}
                required
              />
              <img
                src={
                  showConfirmPassword
                    ? "/image/invisible.svg"
                    : "/image/visible.svg"
                }
                alt="비밀번호 확인 가시성 토글"
                className={styles.visibilityIcon}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {touched.confirmPassword && errorMessage.confirmPassword && (
              <div className={styles.errorMessage}>
                {errorMessage.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={styles.signupButton}
            style={{ backgroundColor: isValid ? "#3692FF" : "#9CA3AF" }}
            disabled={!isValid} // 유효성 통과하지 않으면 비활성화
          >
            회원가입
          </button>
        </form>

        <SocialLogin />

        <div className={styles.loginLink}>
          이미 회원이신가요? <a href="/login">로그인</a>
        </div>

        {showModal && (
          <Modal
            message="가입 완료되었습니다."
            onConfirm={handleModalConfirm}
          />
        )}
      </main>
    </div>
  );
};

export default SignupPage;

