import Image from "next/image";
import Link from "next/link";
import AlertModal from "@/components/Modals/AlertModal";
import { useEffect, useState } from "react";
import styles from "@/styles/login.module.css";
import useFormValidation from "@/hooks/useFormValidation";
import ic_visibility_on from "@/public/images/btn_visibility_on_24px.png";
import ic_visibility from "@/public/images/btn_visibility_24px.png";
import main_logo from "@/public/images/logo.png";
import ic_kakao from "@/public/images/kakaoicon.png";
import ic_google from "@/public/images/googleicon.png";
import useAuth from "@/contexts/authContext";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  const toggleVisible = (e) => {
    const { name } = e.target;
    setPasswordVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const { values, errors, handleChange, handleSubmit, disabled, setErrors } =
    useFormValidation({ email: "", password: "" }, handleLogin);

  //스코프를 이용하기 위해서 화살표함수가 아닌 함수로 정의
  async function handleLogin(value) {
    try {
      await login(value);
      router.push("/Items");
    } catch (error) {
      console.log(error);
      setErrors({
        email: "이메일을 확인해 주세요",
        password: "비밀번호를 확인해 주세요",
      });
      //서버에서 에러의 리스폰스로 메시지를 주고 있음
      setAlertMessage(error.response.data.message);
      handleOpenAlert();
    }
  }

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
            alt="판다마켓 메인로고"
            priority
          />
          <label className={styles.input_label}>
            이메일
            <div>
              <input
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                className={styles.input}
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
            비밀번호
            <div>
              <input
                type={passwordVisible.password ? "text" : "password"}
                name="password"
                onChange={handleChange}
                className={styles.input}
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
          <button
            className={`${styles.login_btn} ${disabled && styles.disabled}`}
          >
            로그인
          </button>
          <div className={styles.sns_login_box}>
            <span>간편 로그인하기</span>
            <div className={styles.sns_ic_box}>
              <Link href={"https://www.kakaocorp.com/page"} target="_blank">
                <Image
                  src={ic_kakao}
                  width={42}
                  height={42}
                  alt="카카오톡 로그인"
                />
              </Link>
              <Link href={"https://www.google.com"} target="_blank">
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
            <span>판다마켓이 처음이신가요? </span>
            <Link href={"/SignUp"}>
              <span className={styles.sign_up_href}>회원가입</span>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}

export default Login;
