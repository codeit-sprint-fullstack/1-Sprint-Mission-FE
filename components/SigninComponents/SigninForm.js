import styles from "./SigninForm.module.css";
import Image from "next/image";
import logoImg from "@/images/desktop_logo.png";
import btn_visibility from "@/images/btn_visibility.png";
import btn_hide from "@/images/btn_hide.png";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { useState, useEffect } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import validate from "@/utils/validationRules";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signup } from "@/utils/authApi";
import FormFooter from "./FormFooter";
import Modal from "../ModalComponents/Modal";

export default function SigninForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const togglePasswordVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmVisible(!isConfirmVisible);

  const initialState = {
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  };

  const { handleChange, values, errors, handleBlur, touched, setErrors } =
    useFormValidation(initialState, validate);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      router.push(ROUTES.ITEMS);
    },
    onError: (error) => {
      setModalMessage(error.message);
      setShowModal(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
      !errors.nickname
    ) {
      mutation.mutate({
        email: values.email,
        nickname: values.nickname,
        password: values.password,
        passwordConfirmation: values.confirmPassword,
      });
    }
  };

  return (
    <>
      <Link href={ROUTES.HOME} passHref>
        <Image src={logoImg} alt="logo" className={styles.logo} />
      </Link>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label className={styles.label}>이메일</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <p className={styles.error}>{errors.email}</p>
        )}

        <label className={styles.label}>닉네임</label>
        <input
          className={styles.input}
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          value={values.nickname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.nickname && errors.nickname && (
          <p className={styles.error}>{errors.nickname}</p>
        )}

        <label className={styles.label}>비밀번호</label>
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Image
            src={isVisible ? btn_visibility : btn_hide}
            alt="btn_hide"
            className={styles.btn_pw}
            onClick={togglePasswordVisibility}
          />
        </div>
        {touched.password && errors.password && (
          <p className={styles.error}>{errors.password}</p>
        )}

        <label className={styles.label}>비밀번호 확인</label>
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={isConfirmVisible ? "text" : "password"}
            name="confirmPassword"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Image
            src={isConfirmVisible ? btn_visibility : btn_hide}
            alt="btn_hide"
            className={styles.btn_pw}
            onClick={toggleConfirmPasswordVisibility}
          />
        </div>
        {touched.confirmPassword && errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}

        <button
          className={styles.signinBtn}
          type="submit"
          disabled={
            errors.email ||
            errors.password ||
            errors.confirmPassword ||
            errors.nickname
          }
        >
          회원가입
        </button>
      </form>

      <FormFooter />

      {showModal && (
        <Modal text={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
