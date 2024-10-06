import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/lib/api";
import { useRouter } from "next/router";
import Redirect from "@/lib/Redirect";

export default function Login() {
  const router = useRouter();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("/btn_visibility_off.png");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("이메일을 입력해주세요.")
      .email("잘못된 이메일입니다."),
    password: Yup.string()
      .required("비밀번호를 입력해주세요.")
      .min(8, "비밀번호를 8자 이상 입력해주세요.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]{8,}$/,
        "비밀번호는 영문, 숫자를 포함해야 합니다."
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid: formIsValid, dirtyFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const getClassName = (field) => {
    const lowerCaseField = field.toLowerCase();
    let className = styles[`login${field}Input`];
    if (dirtyFields[lowerCaseField]) {
      if (errors[lowerCaseField]) {
        className += ` ${styles.inputError}`;
      } else {
        className += ` ${styles.inputSuccess}`;
      }
    }
    return className;
  };

  function handleType() {
    if (type === "password") {
      setType("text");
      setIcon("/btn_visibility_on.png");
    } else {
      setType("password");
      setIcon("/btn_visibility_off.png");
    }
  }

  const onSubmit = async (data) => {
    const response = await signIn({
      email: data.email,
      password: data.password,
    });

    if (!response.ok) {
      if (
        response.message === "존재하지 않는 이메일입니다." ||
        response.message === "비밀번호가 일치하지 않습니다."
      ) {
        console.log("error1:", response);
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        console.log("success:", response);
        window.location.href = "/items";
      }
    }
    return;
  };

  return (
    <Redirect>
      <div className={styles.loginWrap}>
        <Link href="/">
          <Image
            src="/logo.png"
            className={styles.loginLogo}
            width={396}
            height={132}
            alt="logo"
            priority
          />
        </Link>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.loginEmailContainer}>
            <label className={styles.loginEmailLabel}>이메일</label> <br />
            <input
              className={getClassName("Email")}
              autoComplete="email"
              placeholder="이메일을 입력해주세요."
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.loginPasswordContainer}>
            <label className={styles.loginPasswordLabel}>비밀번호</label> <br />
            <input
              className={getClassName("Password")}
              placeholder="비밀번호를 입력해주세요."
              {...register("password")}
              autoComplete="new-password"
              type={type}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
            <Image
              src={icon}
              className={styles.loginToggleBtn}
              width={24}
              height={24}
              alt="visibility_btn"
              onClick={handleType}
            />
          </div>
          <button className={styles.loginBtn} disabled={!formIsValid}>
            로그인
          </button>
        </form>
        <div className={styles.loginEasyContainer}>
          <span>간편 로그인하기 </span>
          <div className={styles.loginEasyIconContainer}>
            <Link href="https://www.google.com">
              <Image
                src="/google.png"
                width={42}
                height={42}
                alt="google_login"
              />
            </Link>
            <Link href="https://www.kakaocorp.com/page">
              <Image
                src="/kakaotalk.png"
                width={42}
                height={42}
                alt="kakaotalk_login"
              />
            </Link>
          </div>
        </div>
        <div className={styles.loginFirst}>
          <span className={styles.loginFirstText}>
            판다마켓이 처음이신가요?
          </span>
          <Link href="/signup" className={styles.loginSignin}>
            회원가입
          </Link>
        </div>
      </div>
    </Redirect>
  );
}
