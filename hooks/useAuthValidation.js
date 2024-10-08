import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { signIn, signUp } from "@/utils/auth";
import { useModal } from "@/contexts/ModalContext";
import styles from "@/components/common/AuthForm.module.css";

export const useAuthValidation = (mode) => {
  const router = useRouter();
  const { showModal } = useModal();

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
        showModal({
          showImage: false,
          content: error.message,
          confirmText: "확인",
          showCancel: false,
          mode: "auth",
        });
      },
    }
  );

  const handleSubmit = (formData) => {
    authMutation.mutate(formData);
  };

  return { handleSubmit, isLoading: authMutation.isLoading };
};
