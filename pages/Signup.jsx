import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/signup.module.css";
import ic_visibility_on from "@/public/images/btn_visibility_on_24px.png";
import ic_visibility from "@/public/images/btn_visibility_24px.png";
import main_logo from "@/public/images/logo.png";
import ic_kakao from "@/public/images/kakaoicon.png";
import ic_google from "@/public/images/googleicon.png";
import * as api from "@/pages/api/auth";
import useFormValidation from "@/hooks/useFormValidation";
import AlertModal from "@/components/Modals/AlertModal";
import useAuth from "@/contexts/authContext";

function SignUp() {
  const router = useRouter();
  const { getMe } = useAuth(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  const createUser = async (value) => {
    try {
      const data = await api.createUser(value);
      //리스폰스로 생성된 유저의 password를 안줌
      if (data) {
        localStorage.setItem("codeit-accessToken", data.accessToken);
        localStorage.setItem("codeit-refreshToken", data.refreshToken);
        getMe();
        router.push("/Items");
      } else {
        setAlertMessage("회원가입에 실패했습니다.");
        handleOpenAlert();
      }
    } catch (error) {
      console.log(error);
      //서버에서 에러의 리스폰스로 메시지를 주고 있음
      setAlertMessage(error.response.data.message);
      handleOpenAlert();
    }
  };

  const { values, errors, handleChange, handleSubmit, disabled } =
    useFormValidation(
      { email: "", password: "", passwordConfirmation: "", nickname: "" },
      createUser
    );

  const toggleVisible = (e) => {
    const { name } = e.target;
    setPasswordVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    //요구사항은 로컬스토리지에 값이 있으면 리다이렉트 이지만...토큰은 있는데 상용자정보가 없을수 있다 의문..
    const token = localStorage.getItem("codeit-accessToken");
    if (token) {
      router.push("/Folder");
    }
  });

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
                name="nickname"
                value={values.nickname || ""}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.nickname && styles.err_border
                }`}
                placeholder="닉네임을 입력해주세요"
                autoComplete="off"
              />
              {errors.nickname && (
                <p className={styles.err_mes} style={{ color: "red" }}>
                  {errors.nickname}
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
                src={
                  passwordVisible.password ? ic_visibility_on : ic_visibility
                }
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
                type={
                  passwordVisible.passwordConfirmation ? "text" : "password"
                }
                name="passwordConfirmation"
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.passwordConfirmation && styles.err_border
                }`}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                autoComplete="off"
              />
              <Image
                onClick={toggleVisible}
                name="passwordConfirmation"
                className={styles.ic_visible}
                src={
                  passwordVisible.password ? ic_visibility_on : ic_visibility
                }
                width={24}
                height={24}
                alt="비밀번호보기"
              />
              {errors.passwordConfirmation && (
                <p className={styles.err_mes} style={{ color: "red" }}>
                  {errors.passwordConfirmation}
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
              <Link href={"https://www.kakaocorp.com/page"}>
                <Image
                  src={ic_kakao}
                  width={42}
                  height={42}
                  alt="카카오톡 로그인"
                />
              </Link>
              <Link href={"https://www.google.com"}>
                <Image
                  src={ic_google}
                  width={42}
                  height={42}
                  alt="구글 로그인"
                />
              </Link>
            </div>
          </div>
          <div className={styles.sign_up_box}>
            <span>이미 판다마켓 회원이신가요? </span>
            <Link href={"/Login"}>
              <span className={styles.sign_up_href}>로그인</span>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default SignUp;
