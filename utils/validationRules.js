export default function validate(values) {
  let errors = {};

  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!values.nickname) {
    errors.nickname = "닉네임을 입력해주세요.";
  } else if (values.nickname.length < 1) {
    errors.nickname = "닉네임는 1자리 이상이어야 합니다.";
  }

  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 8) {
    errors.password = "비밀번호는 8자리 이상이어야 합니다.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "비밀번호를 입력해주세요.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "비밀번호가 일치하지 않아요";
  }

  return errors;
}
