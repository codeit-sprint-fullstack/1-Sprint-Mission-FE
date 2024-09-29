// Login.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/login.module.css";
import Image from "next/image";
import Link from "next/link";
import { logIn } from "../api/api"; // api.js에서 logIn 함수 import
import { useRouter } from "next/router";
import Modal from "../components/Modal";
import { useMutation } from "@tanstack/react-query"; // useMutation import

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  // 로그인 페이지 접근 시 토큰 여부를 체크하고 리다이렉트
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     router.push("/folder");
  //   }
  // }, []);

  // useMutation 훅 사용
  const mutation = useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/items");
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      setError("email", { type: "manual", message: "이메일을 확인해 주세요." });
      setError("password", {
        type: "manual",
        message: "비밀번호를 확인해 주세요.",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data); // useMutation을 통해 로그인 요청 실행
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && isValid) {
      handleSubmit(onSubmit)();
    }
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

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isValid || mutation.isLoading}
            >
              {mutation.isLoading ? "로그인 중..." : "로그인"}
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
          <Link href="/signup" className={styles.signupLink}>
            판다마켓이 처음이신가요? <span>회원가입</span>
          </Link>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <p>{modalMessage}</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Login;
