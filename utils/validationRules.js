export const validationRules = {
  email: {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "올바른 이메일 형식이 아닙니다.",
    },
  },
  nickname: {
    required: "닉네임을 입력해주세요.",
    minLength: {
      value: 2,
      message: "닉네임은 2자 이상이어야 합니다.",
    },
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "비밀번호는 8자리 이상이어야 합니다.",
    },
  },
  confirmPassword: (getValues) => ({
    required: "비밀번호를 다시 입력해주세요.",
    validate: (value) =>
      value === getValues("password") || "비밀번호가 일치하지 않습니다.",
  }),
};
