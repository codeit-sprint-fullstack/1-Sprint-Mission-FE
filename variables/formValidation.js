function minMaxLength(min, max) {
  return {
    minLength: { value: min, message: `최소 ${min}자 이상 입력해주세요` },
    maxLength: { value: max, message: `최대 ${max}자까지 입력할 수 있습니다` },
  };
}

export const ARTICLE = {
  TITLE: {
    required: "제목을 입력해 주세요",
    ...minMaxLength(1, 50),
  },
  CONTENT: {
    required: "내용을 입력해 주세요",
    ...minMaxLength(1, 500),
  },
};

export const COMMENT = {
  CONTENT: {
    required: "내용을 입력해 주세요",
    ...minMaxLength(1, 500),
  },
};

export const AUTH = {
  EMAIL: {
    required: "이메일을 입력해 주세요",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/,
      message: "유효한 이메일이 아닙니다",
    },
  },
  PASSWORD: {
    required: "비밀번호를 입력해 주세요",
    pattern: {
      value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
      message: "영문 대소문자, 숫자, 특수문자(!@#$%^&*) 입력 가능합니다",
    },
    ...minMaxLength(8, 14),
  },
  NICKNAME: {
    required: "닉네임을 입력해 주세요",
    ...minMaxLength(1, 20),
  },
};
