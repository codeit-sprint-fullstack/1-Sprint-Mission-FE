// Signup.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/signup.module.css";
import Image from "next/image";
import Link from "next/link";
import { signUp } from "../api/api"; // api.js에서 signUp 함수 import
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query"; // useMutation import
import SignupCompleteModal from "../components/SignupCompleteModal"; // 모달 컴포넌트 import

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [modalMessage, setModalMessage] = useState("");

  const password = watch("password");

  // useMutation 훅 사용
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      setModalMessage("가입 완료되었습니다.");
      setIsModalOpen(true); // 회원가입 성공 시 모달 열기
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      setModalMessage("회원가입에 실패했습니다. 입력한 정보를 확인해 주세요.");
      setIsModalOpen(true);
    },
  });

  const onSubmit = (data) => {
    const signUpData = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      passwordConfirmation: data.confirmPassword,
    };

    mutation.mutate(signUpData); // useMutation을 통해 회원가입 요청 실행
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/items"); // 확인 버튼 클릭 시 /items 페이지로 이동
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <h1 className={styles.title}>
              <Image src="/logo.png" alt="판다마켓" width={396} height={132} />
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>이메일</label>
              <input
                {...register("email", { required: "이메일은 필수입니다." })}
                className={`${styles.input} ${
                  errors.email ? styles.error : ""
                }`}
                placeholder="이메일을 입력해주세요."
                onKeyPress={handleKeyPress}
              />
              {errors.email && (
                <span className={styles.errorMessage}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label}>닉네임</label>
              <input
                {...register("nickname", { required: "닉네임은 필수입니다." })}
                className={`${styles.input} ${
                  errors.nickname ? styles.error : ""
                }`}
                placeholder="닉네임을 입력해주세요."
                onKeyPress={handleKeyPress}
              />
              {errors.nickname && (
                <span className={styles.errorMessage}>
                  {errors.nickname.message}
                </span>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label}>비밀번호</label>
              <div
                className={`${styles.passwordContainer} ${
                  errors.password ? styles.error : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "비밀번호는 필수입니다.",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 8자 이상이어야 합니다.",
                    },
                  })}
                  className={styles.input}
                  placeholder="비밀번호를 입력해주세요."
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                >
                  {showPassword ? (
                    <Image
                      src="/eye.png"
                      alt="Show password"
                      width={20.39}
                      height={14}
                    />
                  ) : (
                    <Image
                      src="/eye2.png"
                      alt="Hide password"
                      width={20.47}
                      height={18.07}
                    />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorMessage}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label className={styles.label}>비밀번호 확인</label>
              <div
                className={`${styles.passwordContainer} ${
                  errors.confirmPassword ? styles.error : ""
                }`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "비밀번호 확인은 필수입니다.",
                    validate: (value) =>
                      value === password || "비밀번호가 일치하지 않아요.",
                  })}
                  className={styles.input}
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={styles.passwordToggle}
                >
                  {showPassword ? (
                    <Image
                      src="/eye.png"
                      alt="Show password"
                      width={20.39}
                      height={14}
                    />
                  ) : (
                    <Image
                      src="/eye2.png"
                      alt="Hide password"
                      width={20.47}
                      height={18.07}
                    />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className={styles.errorMessage}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isValid || mutation.isLoading}
            >
              {mutation.isLoading ? "회원가입 중..." : "회원가입"}
            </button>
          </form>
          <div className={styles.socialLoginContainer}>
            <span className={styles.loginText}>간편 로그인하기</span>
            <div className={styles.loginButtons}>
              <Link
                href="https://www.google.com"
                className={styles.loginButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/google-logo.png"
                  alt="Google 로그인"
                  width={42}
                  height={42}
                />
              </Link>
              <Link
                href="https://www.kakaocorp.com/page"
                className={styles.loginButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/kakao-logo.png"
                  alt="Kakao 로그인"
                  width={42}
                  height={42}
                />
              </Link>
            </div>
          </div>
          <Link href="/login" className={styles.loginLink}>
            이미 회원이신가요? <span>로그인</span>
          </Link>
          <SignupCompleteModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
