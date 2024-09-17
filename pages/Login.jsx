import Image from "next/image";
import Link from "next/link";
import AlertModal from "@/components/Modals/AlertModal";
import { useState } from "react";
import styles from "@/styles/login.module.css";
import useFormValidation from "@/hooks/useFormValidation";
import ic_visible from "@/public/images/btn_visibility_on_24px.png";
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

  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = () => setOpenAlert(false);

  const handleLogin = async (value) => {
    await login(value);
    // router.push("/Products");
  };

  const { values, errors, handleChange, handleSubmit, disabled } =
    useFormValidation({ email: "", password: "" }, handleLogin);

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
                type="password"
                name="password"
                onChange={handleChange}
                className={styles.input}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="off"
              />
              <Image
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
