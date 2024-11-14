import Image from "next/image";
import styles from "./LoginForm.module.css";
import eyeClose from "@/images/eye-close.png";
import eyeShow from "@/images/eye-show.png";
import useFormValidation from "@/hook/useFormValidation";
import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/router";
import { postLogIn } from "@/lib/authApi";
import { useAuth } from "@/context/authContext";

// 유효성 검사 함수
const validate = (name, value) => {
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
    case "password":
      if (value.length < 8) {
        error = "비밀번호를 8자 이상 입력해주세요.";
      }
      break;
    default:
      break;
  }

  return error;
};

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth(); // 전역 상태의 login 함수 사용
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState(""); // 서버 에러 메시지 상태 관리

  const togglePasswordVisiblity = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // useFormValidation 훅 사용
  const {
    values,
    setValues,
    initialState,
    errors,
    handleChange,
    handleSubmit,
  } = useFormValidation(
    { email: "", password: "" }, // 초기값
    validate // 유효성 검사 함수
  );

  // 로그인 버튼 활성화를 위한 유효성
  const isValid =
    !!values.email && !!values.password && !errors.email && !errors.password;

  // 폼 제출 시 실행될 함수
  const onSubmit = async () => {
    const { email, password } = values;

    try {
      console.log("로그인 진행 중...");
      const res = await postLogIn({
        email,
        password,
      });
      console.log("서버 응답:", res); // 서버 응답 로그

      // 서버에서 성공 상태 코드 200로 로그인이 성공됐는지 확인
      if (res.status === 200) {
        setValues(initialState);

        const { accessToken, user } = res.data; // 서버 응답에서 accessToken 추출
        localStorage.setItem("accessToken", accessToken); // 로컬 스토리지에 저장

        login(user); // 유저 정보를 전역 상태로 업데이트
        console.log("로그인 성공");
        console.log(accessToken);
        router.push("/items");
      }
    } catch (error) {
      // error 자체를 출력하여 구조를 확인
      console.log("로그인 오류:", error);

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
        <button className={styles.button} type="submit" disabled={!isValid}>
          로그인
        </button>
      </form>
      {/* dialog 모달 따로 컴포넌트로 제작 아래를 이용 */}
      {serverError && (
        <Modal message={serverError} onClick={handleErrorModal} />
      )}
    </>
  );
}
