export const validateEmail = (email) => {
  if (!email) {
    return "이메일을 입력해주세요";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "잘못된 이메일 형식입니다";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "비밀번호를 입력해주세요";
  } else if (password.length < 8) {
    return "비밀번호를 8자 이상 입력해주세요";
  }
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "비밀번호가 일치하지 않습니다";
  } else if (password !== confirmPassword) {
    return "비밀번호가 일치하지 않습니다";
  }
  return "";
};

export const validateNickname = (nickname) => {
  if (!nickname) {
    return "닉네임을 입력해주세요";
  }
  return "";
};

