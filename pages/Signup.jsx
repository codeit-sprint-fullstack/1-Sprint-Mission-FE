import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import AlertModal from "@/components/Modals/AlertModal";
import { useState } from "react";
import styles from "@/styles/signup.module.css";
import useFormValidation from "@/hooks/useFormValidation";
import ic_visible from "@/public/images/btn_visibility_on_24px.png";
import main_logo from "@/public/images/logo.png";
import ic_kakao from "@/public/images/kakaoicon.png";
import ic_google from "@/public/images/googleicon.png";

function SignUp() {
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    passwordConfirm: false,
  });

  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  const onSubmit = (value) => {
    console.log(value);
  };

  const { values, errors, handleChange, handleSubmit, disabled } =
    useFormValidation({ email: "", password: "", name: "" }, onSubmit);

  const toggleVisible = (e) => {
    const { name } = e.target;
    setPasswordVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleConfirm = (e) => {
    const { value } = e.target;
    setPasswordConfirm(value);
    if (values.password !== value) {
      errors.passwordConfirm = "비밀번호가 일치하지 않습니다";
    } else {
      errors.passwordConfirm = "";
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openAlert}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
      <main>
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <Image
            className={styles.main_logo}
            src={main_logo}
            alt="비밀번호보기"
            priority
          />
          <label className={styles.input_label}>
            이메일
            <div>
              <input
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.email && styles.err_border
                }`}
                placeholder="이메일을 입력해주세요"
                autoComplete="off"
              />
              {errors.email && (
                <p className={styles.err_mes} style={{ color: "red" }}>
                  {errors.email}
                </p>
              )}
            </div>
          </label>
          <label className={styles.input_label}>
            닉네임
            <div>
              <input
                name="name"
                value={values.name || ""}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.name && styles.err_border
                }`}
                placeholder="닉네임을 입력해주세요"
                autoComplete="off"
              />
              {errors.name && (
                <p className={styles.err_mes} style={{ color: "red" }}>
                  {errors.name}
                </p>
              )}
            </div>
          </label>
          <label className={styles.input_label}>
            비밀번호
            <div>
              <input
                type={passwordVisible.password ? "text" : "password"}
                name="password"
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.password && styles.err_border
                }`}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="off"
              />
              <Image
                onClick={toggleVisible}
                name="password"
                className={styles.ic_visible}
                src={ic_visible}
                width={24}
                height={24}
                alt="비밀번호보기"
              />
              {errors.password && (
                <p className={styles.err_mes} style={{ color: "red" }}>
                  {errors.password}
                </p>
              )}
            </div>
          </label>
          <label className={styles.input_label}>
            비밀번호 확인
            <div>
              <input
                type={passwordVisible.passwordConfirm ? "text" : "password"}
                name="passwordConfirm"
                onKeyUp={(e) => {
                  handleConfirm(e);
                }}
                className={`${styles.input} ${
                  errors.passwordConfirm && styles.err_border
                }`}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                autoComplete="off"
              />
              <Image
                onClick={toggleVisible}
                name="passwordConfirm"
                className={styles.ic_visible}
                src={ic_visible}
                width={24}
                height={24}
                alt="비밀번호보기"
              />
              {errors.passwordConfirm && (
                <p className={styles.err_mes} style={{ color: "red" }}>
                  {errors.passwordConfirm}
                </p>
              )}
            </div>
          </label>
          <button
            className={`${styles.login_btn} ${disabled && styles.disabled}`}
          >
            로그인
          </button>
          <div className={styles.sns_login_box}>
            <span>간편 로그인하기</span>
            <div className={styles.sns_ic_box}>
              <Image
                src={ic_kakao}
                width={42}
                height={42}
                alt="카카오톡 로그인"
              />
              <Image
                src={ic_google}
                width={42}
                height={42}
                alt="카카오톡 로그인"
              />
            </div>
          </div>
          <div className={styles.sign_up_box}>
            <span>판다마켓이 처음이신가요? </span>
            <Link href={"/Signup"}>
              <span className={styles.sign_up_href}>회원가입</span>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default SignUp;
