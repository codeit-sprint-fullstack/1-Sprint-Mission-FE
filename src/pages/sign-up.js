import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./CreateAccount.module.css";
import Modal from "../components/Modal"; // 모달 컴포넌트 임포트
import {
  validateEmail,
  validatePassword,
  validatename,
} from "../lib/vaildate_function.mjs";
import { registerUser } from "../api/api"; // API 호출 함수 임포트

export default function CreateAccount() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  // accessToken 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // 회원가입 페이지에서는 로그인 상태일 경우만 리디렉션
      router.push("/folder");
    }
  }, [router]);

  const validateInputs = () => {
    let isValid = true; // 유효성 검사 상태 초기화

    // 이메일 유효성 검사
    if (email && !validateEmail(email)) {
      setEmailError("유효한 이메일을 입력해 주세요.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // 닉네임 유효성 검사
    if (name && !validatename(name)) {
      setNameError("닉네임은 한글로만 작성해 주세요.");
      isValid = false;
    } else {
      setNameError("");
    }

    // 비밀번호 유효성 검사
    if (password) {
      if (!validatePassword(password)) {
        setPasswordError(
          "비밀번호는 숫자, 소문자, 특수문자가 포함되어야 합니다."
        );
        isValid = false;
      } else if (password.length < 8) {
        setPasswordError("비밀번호는 8자 이상이어야 합니다.");
        isValid = false;
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("비밀번호를 입력해 주세요.");
      isValid = false;
    }

    // 비밀번호 확인 유효성 검사
    if (confirmPassword) {
      if (confirmPassword !== password) {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
        isValid = false;
      } else {
        setConfirmPasswordError("");
      }
    } else {
      setConfirmPasswordError("비밀번호 확인을 입력해 주세요.");
      isValid = false;
    }

    // 버튼 활성화 상태 설정
    setIsButtonDisabled(!isValid);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    validateInputs(); // 입력할 때마다 유효성 검사
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateInputs(); // 제출 시에도 유효성 검사

    if (
      emailError === "" &&
      nameError === "" &&
      passwordError === "" &&
      confirmPasswordError === ""
    ) {
      try {
        const response = await registerUser({
          email,
          nickname: name,
          password,
          passwordConfirmation: confirmPassword,
        });

        // accessToken을 로컬 스토리지에 저장
        localStorage.setItem("accessToken", response.accessToken);

        setModalMessage("회원가입이 성공적으로 완료되었습니다!");
        setShowModal(true);
        console.log("회원가입 요청:", response);

        // 회원가입 성공 시 중고마켓 페이지로 이동
        router.push("/items"); // 중고마켓 페이지로 이동
      } catch (error) {
        if (error.response) {
          console.error("회원가입 요청 실패:", error.response.data); // 오류 응답 데이터 출력
        } else {
          console.error("회원가입 요청 실패:", error.message);
        }
        setModalMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
        setShowModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.label}>이메일</label>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
          />
          {emailError && <p className={styles.error}>{emailError}</p>}

          <label className={styles.label}>닉네임</label>
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={name}
            onChange={handleInputChange(setName)}
            required
          />
          {nameError && <p className={styles.error}>{nameError}</p>}

          <label className={styles.label}>비밀번호</label>
          <div className={styles.ps_confirm}>
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handleInputChange(setPassword)}
              required
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>

          <label className={styles.label}>비밀번호 확인</label>
          <div className={styles.ps_confirm}>
            <input
              className={styles.input}
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
              required
            />
            {confirmPasswordError && (
              <p className={styles.error}>{confirmPasswordError}</p>
            )}
          </div>

          <button
            className={styles.button}
            type="submit"
            disabled={isButtonDisabled}
          >
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

      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </main>
  );
}
