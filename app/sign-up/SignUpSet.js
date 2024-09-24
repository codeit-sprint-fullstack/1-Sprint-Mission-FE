import { useForm } from "react-hook-form";
import { signUp } from "@/lib/api-codeit-auth";

const EmailInput = ({ label, register, required }) => (
  <div>
    <label className="sign-in__label">이메일</label>
    <input
      id="email"
      type="text"
      {...register(label, {
        required: "이메일을 입력해주세요",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "이메일 형식이 아닙니다",
        },
      })}
    />
  </div>
);

const PasswordInput = ({ label, register, required }) => (
  <div>
    <label className="sign-in__label">비밀번호</label>
    <input
      id="password"
      type="password"
      {...register(label, {
        required: "비밀번호를 입력해주세요",
        minLength: { value: 8, message: "8자 이상 비밀번호가 필요합니다" },
        pattern: {
          value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
          message: "이메일 형식이 아닙니다",
        },
      })}
    />
  </div>
);

const PasswordConfirmInput = ({ label, register, required }) => (
  <div>
    <label className="sign-in__label">비밀번호</label>
    <input
      id="password"
      type="password"
      {...register(label, {
        required: "비밀번호를 입력해주세요",
        minLength: { value: 8, message: "8자 이상 비밀번호가 필요합니다" },
        pattern: {
          value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
          message: "이메일 형식이 아닙니다",
        },
      })}
    />
  </div>
);

export default function SignInSet() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { error },
  } = useForm();

  const password = watch("password");

  const handleSignInBtnClick = () => {
    signUp({ email: "", password: password, passwordConfirmation: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput label="email" register={register} required />
      <PasswordInput label="password" register={register} required />
      <PasswordConfirmInput label="password" register={register} required />
    </form>
  );
}
