import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styles from "./LoginForm.module.css";
import logoImg from "@/images/desktop_logo.png";
import btn_visibility from "@/images/btn_visibility.png";
import btn_hide from "@/images/btn_hide.png";
import { ROUTES } from "@/utils/rotues";
import Modal from "../ModalComponents/Modal";
import { login } from "@/utils/authApi";
import FormFooter from "./FormFooter.jsx";
import { validationRules } from "@/utils/validationRules";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      router.push(ROUTES.ITEMS);
    },
    onError: (error) => {
      const errorResponse =
        error.response?.data?.message ||
        "로그인에 실패했습니다. 다시 시도해 주세요.";
      setModalMessage(errorResponse);
      setShowModal(true);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Link href={ROUTES.HOME} passHref>
        <Image src={logoImg} alt="logo" className={styles.logo} />
      </Link>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} htmlFor="email">
          이메일
        </label>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          {...register("email", validationRules.email)}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password", validationRules.password)}
          />
          <Image
            src={isPasswordVisible ? btn_visibility : btn_hide}
            alt="btn_hide"
            className={styles.btn_pw}
            onClick={togglePasswordVisibility}
          />
        </div>
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <button className={styles.loginBtn} type="submit" disabled={!isValid}>
          로그인
        </button>
      </form>
      <FormFooter />
      {showModal && (
        <Modal text={modalMessage} onConfirm={() => setShowModal(false)} />
      )}
    </>
  );
}
