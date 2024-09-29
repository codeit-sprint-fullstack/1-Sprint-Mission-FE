import styles from "@/styles/Signup.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signUp } from "@/lib/api";
import { useRouter } from "next/router";
import Redirect from "@/lib/Redirect";

export default function Signup() {
  const router = useRouter();
  const [type, setType] = useState({
    signupPassword: "password",
    passwordConfirm: "password",
  });
  const [icon, setIcon] = useState({
    signupPassword: "/btn_visibility_off.png",
    passwordConfirm: "/btn_visibility_off.png",
  });

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("이메일을 입력해주세요.")
      .email("잘못된 이메일입니다."),
    nickname: yup
      .string()
      .required("닉네임을 입력해주세요.")
      .min(2, "2자 이상 입력해주세요."),
    password: yup
      .string()
      .required("비밀번호를 입력해주세요.")
      .min(8, "비밀번호를 8자 이상 입력해주세요.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]{8,}$/,
        "비밀번호는 영문, 숫자를 포함해야 합니다."
      ),
    passwordConfirm: yup
      .string()
      .required("비밀번호를 다시 한 번 입력해주세요.")
      .min(8, "비밀번호를 8자 이상 입력해주세요.")
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid: formIsValid },
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password");

  useEffect(() => {
    if (dirtyFields.passwordConfirm) {
      trigger("passwordConfirm");
    }
  }, [passwordValue]);

  function handleType(field) {
    if (type[field] === "password") {
      setType({ ...type, [field]: "text" });
      setIcon({ ...icon, [field]: "/btn_visibility_on.png" });
    } else {
      setType({ ...type, [field]: "password" });
      setIcon({ ...icon, [field]: "/btn_visibility_off.png" });
    }
  }

  const toLowerCaseFirstChar = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  const getClassName = (field) => {
    const lowerCaseField = toLowerCaseFirstChar(field);
    let className = styles[`signup${field}Input`];
    if (dirtyFields[lowerCaseField]) {
      if (errors[lowerCaseField]) {
        className += ` ${styles.inputError}`;
      } else {
        className += ` ${styles.inputSuccess}`;
      }
    }
    return className;
  };

  const onSubmit = async (data) => {
    const response = await signUp({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      passwordConfirmation: data.passwordConfirm,
    });

    if (!response.ok) {
      if (response.message === "이미 사용중인 이메일입니다.") {
        console.log("error1:", response);
        alert("이미 사용중인 이메일입니다.");
      } else if (response.message === "이미 사용중인 닉네임입니다.") {
        console.log("error1:", response);
        alert("이미 사용중인 닉네임입니다.");
      } else {
        console.log("error:", response);
        alert("가입 완료되었습니다.");
        router.push("/items");
      }
      return;
    }
  };

  return (
    <Redirect>
      <div className={styles.signupWrap}>
        <Link href="/">
          <Image
            src="/logo.png"
            className={styles.signupLogo}
            width={396}
            height={132}
            alt="logo"
          />
        </Link>
        <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.signupEmailContainer}>
            <label className={styles.signupEmailLabel}>이메일</label> <br />
            <input
              className={getClassName("Email")}
              placeholder="이메일을 입력해주세요."
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.signupNicknameContainer}>
            <label className={styles.signupNicknameLabel}>닉네임</label> <br />
            <input
              className={getClassName("Nickname")}
              placeholder="닉네임을 입력해주세요."
              {...register("nickname")}
              autoComplete="nickname"
            />
            {errors.nickname && (
              <p className={styles.error}>{errors.nickname.message}</p>
            )}
          </div>
          <div className={styles.signupPasswordContainer}>
            <label className={styles.signupPasswordLabel}>비밀번호</label>{" "}
            <br />
            <input
              className={getClassName("Password")}
              type={type.signupPassword}
              placeholder="비밀번호를 입력해주세요."
              {...register("password")}
              autoComplete="new-password"
            />
            <Image
              src={icon.signupPassword}
              className={styles.signupToggleBtn}
              width={24}
              height={24}
              alt="visibility_btn"
              onClick={() => handleType("signupPassword")}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          <div className={styles.signupPasswordConfirmContainer}>
            <label className={styles.signupPasswordConfirmLabel}>
              비밀번호 확인
            </label>
            <br />
            <input
              className={getClassName("PasswordConfirm")}
              type={type.passwordConfirm}
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              {...register("passwordConfirm")}
              autoComplete="new-password"
            />
            <Image
              src={icon.passwordConfirm}
              className={styles.signupToggleBtn}
              width={24}
              height={24}
              alt="visibility_btn"
              onClick={() => handleType("passwordConfirm")}
            />
            {errors.passwordConfirm && (
              <p className={styles.error}>{errors.passwordConfirm.message}</p>
            )}
          </div>
          <button className={styles.signupBtn} disabled={!formIsValid}>
            가입하기
          </button>
        </form>
        <div className={styles.signupEasyContainer}>
          <span>간편 로그인하기 </span>
          <div className={styles.signupEasyIconContainer}>
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
        <div className={styles.signupMember}>
          <span className={styles.signupMemberText}>이미 회원이신가요?</span>
          <Link href="/login" className={styles.signupLogin}>
            로그인
          </Link>
        </div>
      </div>
    </Redirect>
  );
}
