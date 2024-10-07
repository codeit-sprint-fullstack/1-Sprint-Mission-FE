import Image from "next/image";
import styles from "./LoginForm.module.css";
import eyeClose from "@/images/eye-close.png";
import eyeShow from "@/images/eye-show.png";
import useFormValidation from "@/hook/useFormValidation";
import { useState } from "react";
import { postSignUp } from "@/lib/authApi";
import Modal from "./Modal";
import { useRouter } from "next/router";

// 유효성 검사 함수
const validate = (name, value, values) => {
  let error = "";

  switch (name) {
    case "email":
      if (!value) {
        error = "이메일을 입력해주세요.";
      } else if (
        !value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
      ) {
        error = "잘못된 이메일 형식입니다.";
      }
      break;
    case "nickname":
      if (!value) {
        error = "닉네임을 입력해주세요.";
      }
      break;
    case "password":
      if (value.length < 8) {
        error = "비밀번호를 8자 이상 입력해주세요.";
      }
      break;
    case "passwordConfirmation":
      if (values.password !== value) {
        error = "비밀번호가 일치하지 않습니다.";
      }
    default:
      break;
  }

  return error;
};

export default function SignUpForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [serverError, setServerError] = useState(""); // 서버 에러 메시지 상태 관리
  const [authSuccess, setAuthSuccess] = useState(""); // 회원 가입 성공 상태 관리

  const togglePasswordVisiblity = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmVisiblity = () => {
    setIsConfirmVisible(!isConfirmVisible);
  };

  // useFormValidation 훅 사용
  const {
    values,
    errors,
    setValues,
    initialState,
    handleChange,
    handleSubmit,
  } = useFormValidation(
    { email: "", nickname: "", password: "", passwordConfirmation: "" }, // 초기값
    validate // 유효성 검사 함수
  );

  // 회원가입 버튼 활성화를 위한 유효성 검사
  const isValid = ["email", "nickname", "password", "passwordConfirmation"].every(
    (name) => values[name] && !errors[name]
  );

  // 폼 제출 시 실행될 함수
  const onSubmit = async () => {
    const { email, nickname, password, passwordConfirmation } = values;

    try {
      console.log("회원가입 요청 중...");
      const res = await postSignUp({
        email,
        nickname,
        password,
        passwordConfirmation,
      });
      console.log("서버 응답:", res); // 서버 응답 로그

      // 서버에서 성공 상태 코드 201로 회원가입 등록됐는지 확인
      if (res.status === 201) {
        console.log("회원가입 성공");
        setAuthSuccess("가입이 완료되었습니다.");
      }
    } catch (error) {
      // error 자체를 출력하여 구조를 확인
      console.log("회원가입 오류:", error);

      // 서버 응답이 있는 경우
      if (error.response) {
        console.log("에러 상태:", error.response.status); // 상태 코드 확인
        console.log("에러 메시지:", error.response.data.message); // 에러 메시지 확인
        setServerError(error.response.data.message);
      } else {
        console.log("에러 응답이 없습니다.");
      }
    }
  };

  // 모달 확인 누를 시 초기화
  const handleErrorModal = () => {
    setServerError("");
    // values 초기화
    setValues(initialState);
  };

  const handleSuccessModal = () => {
    setAuthSuccess("");
    setValues(initialState);
    router.push("/items");
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputForm}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            className={
              errors.email ? styles.otherInputError : styles.otherInput
            }
            name="email"
            placeholder="이메일을 입력해주세요"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <small className={styles.error}>{errors.email}</small>
          )}
        </div>
        <div className={styles.inputForm}>
          <label htmlFor="nickname" className={styles.label}>
            닉네임
          </label>
          <input
            className={
              errors.nickname ? styles.otherInputError : styles.otherInput
            }
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            value={values.nickname}
            onChange={handleChange}
          />
          {errors.nickname && (
            <small className={styles.error}>{errors.nickname}</small>
          )}
        </div>
        <div className={styles.inputForm}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <div className={styles.pwContainer}>
            <input
              className={errors.password ? styles.pwInputError : styles.pwInput}
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              value={values.password}
              onChange={handleChange}
            />
            {values.password && (
              <Image
                src={isPasswordVisible ? eyeShow : eyeClose}
                alt="btn-eye"
                className={styles.eye}
                onClick={togglePasswordVisiblity}
              />
            )}
          </div>
          {errors.password && (
            <small className={styles.error}>{errors.password}</small>
          )}
        </div>
        <div className={styles.inputForm}>
          <label htmlFor="passwordConfirmation" className={styles.label}>
            비밀번호 확인
          </label>
          <div className={styles.pwContainer}>
            <input
              className={
                errors.passwordConfirmation ? styles.pwInputError : styles.pwInput
              }
              name="passwordConfirmation"
              type={isConfirmVisible ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={values.passwordConfirmation}
              onChange={handleChange}
            />
            {values.passwordConfirmation && (
              <Image
                src={isConfirmVisible ? eyeShow : eyeClose}
                alt="btn-eye"
                className={styles.eye}
                onClick={toggleConfirmVisiblity}
              />
            )}
          </div>
          {errors.passwordConfirmation && (
            <small className={styles.error}>{errors.passwordConfirmation}</small>
          )}
        </div>
        <button className={styles.button} type="submit" disabled={!isValid}>
          회원가입
        </button>
      </form>
      {serverError ? (
        <Modal message={serverError} onClick={handleErrorModal} />
      ) : (
        ""
      )}
      {authSuccess ? (
        <Modal message={authSuccess} onClick={handleSuccessModal} />
      ) : (
        ""
      )}
    </>
  );
}
