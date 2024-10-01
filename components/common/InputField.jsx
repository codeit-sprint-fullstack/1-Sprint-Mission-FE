import React, { useState } from "react";
import Image from "next/image";
import styles from "./AuthForm.module.css";

export const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  register,
  error,
  touched,
}) => (
  <div className={styles.inputContainer}>
    <label htmlFor={name} className={styles.label}>
      {label}
    </label>
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className={`${styles.input} ${touched && error ? styles.inputError : ""}`}
    />
    {touched && error && <div className={styles.error}>{error.message}</div>}
  </div>
);

export const PasswordField = ({
  name,
  label,
  placeholder,
  register,
  error,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
          className={`${styles.input} ${
            touched && error ? styles.inputError : ""
          }`}
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
      {touched && error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export const SubmitButton = ({ isValid, isLoading, mode }) => (
  <button
    type="submit"
    className={`${styles.submitButton} ${
      !isValid || isLoading ? styles.submitButtonInvalid : ""
    }`}
    disabled={!isValid || isLoading}
  >
    {isLoading ? "처리 중..." : mode === "login" ? "로그인" : "회원가입"}
  </button>
);
