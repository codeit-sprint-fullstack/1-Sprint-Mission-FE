import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styles from "./LoginForm.module.css";
import { ROUTES } from "@/utils/rotues";
import Modal from "../ModalComponents/Modal";
import { login } from "@/utils/authApi";
import FormFooter from "./FormFooter";
import { validationRules } from "@/utils/validationRules";
import { LoginFormInputs } from "@/types/Types";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push(ROUTES.ITEMS);
    },
    onError: (error: any) => {
      const errorResponse =
        error.response?.data?.message ||
        "로그인에 실패했습니다. 다시 시도해 주세요.";
      setModalMessage(errorResponse);
      setShowModal(true);
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Image
        src="/desktop_logo.png"
        alt="logo"
        className={styles.logo}
        width={396}
        height={132}
      />
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} htmlFor="email">
          이메일
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
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
            id="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password", validationRules.password)}
          />
          <Image
            src={isPasswordVisible ? "/btn_visibility.png" : "/btn_hide.png"}
            alt="toggle visibility"
            className={styles.btn_pw}
            onClick={togglePasswordVisibility}
            width={40}
            height={40}
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
