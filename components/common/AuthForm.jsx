import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { signIn, signUp } from "@/utils/auth";
import { useModal } from "@/contexts/ModalContext";
import styles from "./AuthForm.module.css";

const AuthForm = ({ mode = "login" }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const handleError = (error) => {
    let errorMessage = "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.";

    if (error.message) {
      errorMessage = error.message;
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      errorMessage = error.response.data.message;
    }

    showModal({
      content: errorMessage,
      confirmText: "확인",
      showCancel: false,
      showImage: false, // 이미지를 표시하지 않음
      customClass: styles.authErrorModal,
    });
  };

  const authMutation = useMutation(
    (data) =>
      mode === "login"
        ? signIn(data.email, data.password)
        : signUp(
            data.email,
            data.nickname,
            data.password,
            data.confirmPassword
          ),
    {
      onSuccess: () => {
        router.push(mode === "login" ? "/" : "/login");
      },
      onError: handleError,
    }
  );

  const onSubmit = (data) => {
    authMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="email" className={styles.label}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "잘못된 이메일 형식입니다",
            },
          })}
        />
        {errors.email && (
          <div className={styles.error}>{errors.email.message}</div>
        )}
      </div>

      {mode === "register" && (
        <div className={styles.inputContainer}>
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            className={`${styles.input} ${
              errors.nickname ? styles.inputError : ""
            }`}
            {...register("nickname", { required: "닉네임을 입력해주세요" })}
          />
          {errors.nickname && (
            <div className={styles.error}>{errors.nickname.message}</div>
          )}
        </div>
      )}

      <div className={styles.inputContainer}>
        <label htmlFor="password" className={styles.label}>
          비밀번호
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            className={`${styles.input} ${
              errors.password ? styles.inputError : ""
            }`}
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상이어야 합니다",
              },
            })}
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            <div className={styles.icon}>
              <Image
                src={
                  showPassword
                    ? "/images/ic_openEye.svg"
                    : "/images/ic_closeEye.svg"
                }
                alt={showPassword ? "열린 눈" : "닫힌 눈"}
                width={24}
                height={24}
              />
            </div>
          </button>
        </div>
        {errors.password && (
          <div className={styles.error}>{errors.password.message}</div>
        )}
      </div>

      {mode === "register" && (
        <div className={styles.inputContainer}>
          <label htmlFor="confirmPassword" className={styles.label}>
            비밀번호 확인
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              className={`${styles.input} ${
                errors.confirmPassword ? styles.inputError : ""
              }`}
              {...register("confirmPassword", {
                required: "비밀번호를 다시 한 번 입력해주세요",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword
                  ? "비밀번호 확인 숨기기"
                  : "비밀번호 확인 보기"
              }
            >
              <div className={styles.icon}>
                <Image
                  src={
                    showConfirmPassword
                      ? "/images/ic_openEye.svg"
                      : "/images/ic_closeEye.svg"
                  }
                  alt={showConfirmPassword ? "열린 눈" : "닫힌 눈"}
                  width={24}
                  height={24}
                />
              </div>
            </button>
          </div>
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword.message}</div>
          )}
        </div>
      )}

      <button
        type="submit"
        className={`${styles.submitButton} ${
          !isValid || authMutation.isLoading ? styles.submitButtonInvalid : ""
        }`}
        disabled={!isValid || authMutation.isLoading}
      >
        {authMutation.isLoading
          ? "처리 중..."
          : mode === "login"
          ? "로그인"
          : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
