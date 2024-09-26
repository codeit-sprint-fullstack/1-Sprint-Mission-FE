export const validateField = (name, value, allValues) => {
  let error = "";
  switch (name) {
    case "email":
      if (!value.trim()) {
        error = "이메일을 입력해주세요";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "잘못된 이메일 형식입니다";
      }
      break;
    case "password":
      if (!value.trim()) {
        error = "비밀번호를 입력해주세요";
      } else if (value.length < 8) {
        error = "비밀번호는 8자 이상이어야 합니다";
      }
      break;
    case "confirmPassword":
      if (!value.trim()) {
        error = "비밀번호를 다시 한 번 입력해주세요";
      } else if (value !== allValues.password) {
        error = "비밀번호가 일치하지 않습니다";
      }
      break;
    case "nickname":
      if (!value.trim()) {
        error = "닉네임을 입력해주세요";
      }
      break;
    default:
      break;
  }
  return error;
};

export const validateForm = (data, mode) => {
  const errors = {};
  const fieldsToValidate =
    mode === "login"
      ? ["email", "password"]
      : ["email", "password", "confirmPassword", "nickname"];

  fieldsToValidate.forEach((field) => {
    const error = validateField(field, data[field], data);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
