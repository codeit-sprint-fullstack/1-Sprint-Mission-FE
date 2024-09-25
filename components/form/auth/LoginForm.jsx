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
  const { login } = useAuth();
  const { isModalOpen, onModalClose, onModalOpen, onModalConfirm } = useModal();

  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const handleLoginSubmit = () => {
    login();
  };

  return (
    <>
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
