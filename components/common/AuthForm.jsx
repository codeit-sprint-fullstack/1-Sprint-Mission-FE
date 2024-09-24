import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { signIn, signUp } from "@/utils/auth";
import styles from "./AuthForm.module.css";

const AuthForm = ({ mode = "login" }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

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
      onError: (error) => {
        setErrors((prev) => ({ ...prev, form: error.message }));
      },
    }
  );

  const validateField = useCallback((name, value, allValues) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value.trim()) {
          error = "이메일을 입력해주세요";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "잘못된 이메일 형식입니다";
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "비밀번호를 입력해주세요";
        } else if (value.length < 8) {
          error = "비밀번호는 8자 이상이어야 합니다";
        }
        break;
      case "confirmPassword":
        if (!value.trim()) {
          error = "비밀번호를 다시 한 번 입력해주세요";
        } else if (value !== allValues.password) {
          error = "비밀번호가 일치하지 않습니다";
        }
        break;
      case "nickname":
        if (!value.trim()) {
          error = "닉네임을 입력해주세요";
        }
        break;
      default:
        break;
    }
    return error;
  }, []);

  const validateForm = useCallback(
    (data) => {
      const newErrors = {};
      Object.keys(data).forEach((key) => {
        const error = validateField(key, data[key], data);
        if (error) newErrors[key] = error;
      });
      return newErrors;
    },
    [validateField]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => {
        const newData = { ...prev, [name]: value };
        const newErrors = validateForm(newData);
        setErrors(newErrors);
        setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
        return newData;
      });
    },
    [validateForm]
  );

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
      ...(mode === "register" && { nickname: true, confirmPassword: true }),
    });
    if (isFormValid) {
      authMutation.mutate(formData);
    }
  };

  useEffect(() => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    const fieldsToValidate =
      mode === "login"
        ? ["email", "password"]
        : ["email", "password", "confirmPassword", "nickname"];

    const isValid = fieldsToValidate.every(
      (field) => formData[field].trim() !== "" && !newErrors[field]
    );

    setIsFormValid(isValid);
  }, [formData, validateForm, mode]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="email" className={styles.label}>
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={`${styles.input} ${
            touched.email && errors.email ? styles.inputError : ""
          }`}
        />
        {touched.email && errors.email && (
          <div className={styles.error}>{errors.email}</div>
        )}
      </div>

      {mode === "register" && (
        <div className={styles.inputContainer}>
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={formData.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`${styles.input} ${
              touched.nickname && errors.nickname ? styles.inputError : ""
            }`}
          />
          {touched.nickname && errors.nickname && (
            <div className={styles.error}>{errors.nickname}</div>
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
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`${styles.input} ${
              touched.password && errors.password ? styles.inputError : ""
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
        {touched.password && errors.password && (
          <div className={styles.error}>{errors.password}</div>
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
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`${styles.input} ${
                touched.confirmPassword && errors.confirmPassword
                  ? styles.inputError
                  : ""
              }`}
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
          {touched.confirmPassword && errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword}</div>
          )}
        </div>
      )}

      <button
        type="submit"
        className={`${styles.submitButton} ${
          !isFormValid || authMutation.isLoading
            ? styles.submitButtonInvalid
            : ""
        }`}
        disabled={!isFormValid || authMutation.isLoading}
      >
        {authMutation.isLoading
          ? "처리 중..."
          : mode === "login"
          ? "로그인"
          : "회원가입"}
      </button>

      {errors.form && <div className={styles.error}>{errors.form}</div>}
    </form>
  );
};

export default AuthForm;
