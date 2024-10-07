import React, { useState } from "react";
import useForm from "../hook/form";
import styles from "./SignupForm.module.css";
import Image from "next/image";
import { PostSignup } from "../pages/api/user.js";

const SignupForm = ({ isModalOpen, setIsModalOpen }) => {
  const { values, handleChange, handleSubmit, resetForm, isSubmitting } =
    useForm({
      email: "",
      nickname: "",
      password: "",
      password2: "",
    });

  const [errors, setErrors] = useState({});
  const [showpassword1, setShowpassword1] = useState(false);
  const [showpassword2, setShowpassword2] = useState(false);
  const passwordToggleHandler1 = () => {
    setShowpassword1(!showpassword1);
  };
  const passwordToggleHandler2 = () => {
    setShowpassword2(!showpassword2);
  };

  const validate = () => {
    let validationErrors = {};

    if (!values.email) {
      validationErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      validationErrors.email = "잘못된 이메일입니다.";
    }

    if (!values.password) {
      validationErrors.password = "비밀번호를 입력해주세요.";
    } else if (values.password.length < 8) {
      validationErrors.password = "비밀번호를 8자 이상 입력해주세요.";
    }
    if (values.password !== values.password2) {
      validationErrors.password2 = "비밀번호를 입력해주세요.";
    } else if (!values.password2) {
      validationErrors.password2 = "비밀번호가 일치하지 않습니다.";
    }

    if (!values.nickname) {
      validationErrors.nickname = "닉네임을 입력해주세요.";
    } else if (values.nickname.length < 2) {
      validationErrors.nickname = "닉네임 2글자 이상 입력해주세요.";
    }

    return validationErrors;
  };

  const submitForm = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // console.log(values);
      try {
        const res = await PostSignup({
          email: values.email,
          password: values.password,
          nickname: values.nickname,
        });
        if (res && res.status === 201) {
          resetForm();
          console.log("회원가입 성공", res.data);
        } else {
          console.log("회원가입 실패", res.data);
          setIsModalOpen(true);
        }
      } catch (e) {
        setIsModalOpen(true);
        console.log("에러", e);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
      <div className={styles.formGroup}>
        <label className={styles.label}>이메일</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>닉네임</label>
        <input
          type="text"
          name="nickname"
          value={values.nickname}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.nickname && <p className={styles.error}>{errors.nickname}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>비밀번호</label>
        <input
          type={showpassword1 ? "text" : "password"}
          name="password"
          value={values.password}
          onChange={handleChange}
          className={styles.password1}
        />
        <span
          className={styles.passwordToggle}
          onClick={passwordToggleHandler1}
        >
          {!showpassword1 ? (
            <Image src="./eyeClose.svg" alt="Close" width={24} height={24} />
          ) : (
            <Image src="./eyeOpen.svg" alt="open" width={24} height={24} />
          )}
        </span>

        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>비밀번호 확인</label>
        <input
          type={showpassword2 ? "text" : "password"}
          name="password2"
          value={values.password2}
          onChange={handleChange}
          className={styles.password2}
        />
        <span
          className={styles.passwordToggle}
          onClick={passwordToggleHandler2}
        >
          {!showpassword2 ? (
            <Image src="./eyeClose.svg" alt="Close" width={24} height={24} />
          ) : (
            <Image src="./eyeOpen.svg" alt="open" width={24} height={24} />
          )}
        </span>
        {errors.password2 && <p className={styles.error}>{errors.password2}</p>}
      </div>

      <button className={styles.button} type="submit">
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
