import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styles from "./SigninForm.module.css";
import logoImg from "@/images/desktop_logo.png";
import btn_visibility from "@/images/btn_visibility.png";
import btn_hide from "@/images/btn_hide.png";
import { ROUTES } from "@/utils/rotues";
import Modal from "../ModalComponents/Modal";
import { signup } from "@/utils/authApi";
import FormFooter from "./FormFooter";
import { validationRules } from "@/utils/validationRules";

export default function SigninForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("error");

  const togglePasswordVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmVisible(!isConfirmVisible);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setModalMessage("가입이 완료되었습니다!");
      setModalType("success");
      setShowModal(true);
    },
    onError: (error) => {
      const serverErrorMessage =
        error.response?.data?.message || "회원가입에 실패했습니다.";
      setModalMessage(serverErrorMessage);
      setModalType("error");
      setShowModal(true);
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      passwordConfirmation: data.confirmPassword,
    };
    mutation.mutate(formattedData);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    if (modalType === "success") {
      router.push(ROUTES.ITEMS);
    }
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

        <label className={styles.label} htmlFor="nickname">
          닉네임
        </label>
        <input
          className={styles.input}
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          {...register("nickname", validationRules.nickname)}
        />
        {errors.nickname && (
          <p className={styles.error}>{errors.nickname.message}</p>
        )}

        <label className={styles.label} htmlFor="password">
          비밀번호
        </label>
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password", validationRules.password)}
          />
          <Image
            src={isVisible ? btn_visibility : btn_hide}
            alt="btn_hide"
            className={styles.btn_pw}
            onClick={togglePasswordVisibility}
          />
        </div>
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}

        <label className={styles.label} htmlFor="confirmPassword">
          비밀번호 확인
        </label>
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={isConfirmVisible ? "text" : "password"}
            name="confirmPassword"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            {...register(
              "confirmPassword",
              validationRules.confirmPassword(getValues)
            )}
          />
          <Image
            src={isConfirmVisible ? btn_visibility : btn_hide}
            alt="btn_hide"
            className={styles.btn_pw}
            onClick={toggleConfirmPasswordVisibility}
          />
        </div>
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}

        <button className={styles.signinBtn} type="submit" disabled={!isValid}>
          회원가입
        </button>
      </form>

      <FormFooter />

      {showModal && (
        <Modal text={modalMessage} onConfirm={handleModalConfirm} />
      )}
    </>
  );
}
