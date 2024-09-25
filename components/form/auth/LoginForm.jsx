import { FormProvider, useForm } from "react-hook-form";
import styles from "./authForm.module.scss";
import Input from "../comm/Input";
import Button from "../../ui/Button";
import { PasswordInput } from "../comm/PasswordInput";
import { AUTH } from "@/variables/formValidation";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthProvider";
import { useModal } from "@/hooks/useModal";

export default function LoginForm() {
  const formMethods = useForm();
  const { logIn } = useAuth();

  const {
    isModalOpen,
    modalRef,
    onModalConfirm,
    onModalOpen,
    onModalClose,
    modalMsg,
  } = useModal();

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = formMethods;

  const handleLoginSubmit = (data) => {
    logIn.mutate(data, {
      onSuccess: () => {
        console.log("로그인 됨");
        reset();
      },
      onError: (error) => {
        console.error(error.message, error.status);
        onModalOpen(error.message || "로그인 오류가 발생했습니다");
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
            logIn.isError
              ? () => onModalClose()
              : () => onModalConfirm("/products")
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
          <PasswordInput
            name="password"
            label="비밀번호"
            validations={AUTH.PASSWORD}
          />
          <Button variant="auth" type="submit" disabled={!isValid}>
            로그인
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
