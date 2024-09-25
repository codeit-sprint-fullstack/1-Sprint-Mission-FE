import styles from "./authForm.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../comm/Input";
import Button from "../../ui/Button";
import { PasswordInput } from "../comm/PasswordInput";
import { AUTH } from "@/variables/formValidation";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthProvider";

export default function SignUpForm() {
  const formMethods = useForm();
  const {
    isModalOpen,
    modalRef,
    onModalConfirm,
    onModalOpen,
    onModalClose,
    modalMsg,
  } = useModal();
  const { signUp } = useAuth();

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = formMethods;

  const handleLoginSubmit = (data) => {
    signUp.mutate(data, {
      onSuccess: () => {
        onModalOpen("가입이 완료되었습니다.");
        reset();
      },
      onError: (error) => {
        console.error(error.message, error.status);
        onModalOpen(error.message);
      },
    });
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          ref={modalRef}
          msg={modalMsg}
          onClose={
            signUp.isError
              ? () => onModalClose()
              : () => onModalConfirm("/auth/login")
          }
        />
      )}
      <FormProvider {...formMethods}>
        <form
          className={styles.AuthForm}
          onSubmit={handleSubmit(handleLoginSubmit)}
        >
          <Input
            name="email"
            label="이메일"
            type="email"
            validations={AUTH.EMAIL}
          />
          <Input
            name="nickname"
            label="닉네임"
            type="text"
            validations={AUTH.NICKNAME}
          />
          <PasswordInput
            name="password"
            label="비밀번호"
            validations={AUTH.PASSWORD}
          />
          <PasswordInput
            name="passwordConfirmation"
            label="비밀번호 확인"
            validations={AUTH.CONFIRM_PW}
          />
          <Button variant="auth" type="submit" disabled={!isValid}>
            로그인
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
