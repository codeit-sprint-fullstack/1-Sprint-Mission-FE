import { useForm as useReactHookForm } from "react-hook-form";

export const useForm = (mode) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useReactHookForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "register" && { confirmPassword: "", nickname: "" }),
    },
  });

  const validateEmail = (value) => {
    if (!value.trim()) return "이메일을 입력해주세요";
    if (!/\S+@\S+\.\S+/.test(value)) return "잘못된 이메일 형식입니다";
    return true;
  };

  const validatePassword = (value) => {
    if (!value.trim()) return "비밀번호를 입력해주세요";
    if (value.length < 8) return "비밀번호는 8자 이상이어야 합니다";
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (!value.trim()) return "비밀번호를 다시 한 번 입력해주세요";
    if (value !== watch("password")) return "비밀번호가 일치하지 않습니다";
    return true;
  };

  const validateNickname = (value) => {
    if (!value.trim()) return "닉네임을 입력해주세요";
    return true;
  };

  const registerField = (name) => {
    switch (name) {
      case "email":
        return register(name, { validate: validateEmail });
      case "password":
        return register(name, { validate: validatePassword });
      case "confirmPassword":
        return register(name, { validate: validateConfirmPassword });
      case "nickname":
        return register(name, { validate: validateNickname });
      default:
        return register(name);
    }
  };

  return {
    register: registerField,
    handleSubmit,
    errors,
    isValid,
    watch,
  };
};
