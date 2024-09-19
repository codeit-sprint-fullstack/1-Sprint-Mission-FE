import styles from "./LoginForm.module.css";
import Image from "next/image";
import logoImg from "@/images/desktop_logo.png";
import btn_visibility from "@/images/btn_visibility.png";
import btn_hide from "@/images/btn_hide.png";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { useState } from "react";
import useFormValidation from "@/hooks/useFormValidation";
import validate from "@/utils/validationRules";
import FormFooter from "./FormFooter";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const initialState = {
    email: "",
    password: "",
  };
  const { handleChange, values, errors, handleBlur, touched } =
    useFormValidation(initialState, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password) {
      // 서버로 전송 등의 추가 로직 작성
    }
  };

  return (
    <>
      <Link href={ROUTES.HOME} passHref>
        <Image src={logoImg} alt="logo" className={styles.logo} />
      </Link>
      <form className={styles.loginForm}>
        <label className={styles.label}>이메일</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <p className={styles.error}>{errors.email}</p>
        )}
        <label className={styles.label}>비밀번호</label>
        <div className={styles.passwordContainer}>
          <input
            className={styles.input}
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Image
            src={isPasswordVisible ? btn_visibility : btn_hide}
            alt="btn_hide"
            className={styles.btn_pw}
            onClick={togglePasswordVisibility}
          />
        </div>
        {touched.password && errors.password && (
          <p className={styles.error}>{errors.password}</p>
        )}
        <button
          className={styles.loginBtn}
          type="submit"
          disabled={errors.email || errors.password}
          onClick={handleSubmit}
        >
          로그인
        </button>
      </form>
      <FormFooter />
    </>
  );
}
