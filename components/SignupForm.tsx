import React, { useState } from 'react';
import useForm from '../hook/form';
import styles from './SignupForm.module.css';
import Image from 'next/image';
import { PostSignup } from '../pages/api/user';
import { AxiosResponse } from 'axios';
import { ErrorResponse } from '../pages/api/types/authTypes'; // 적절한 위치로 변경하세요

function isAxiosResponse<T>(
  response: AxiosResponse<T> | ErrorResponse
): response is AxiosResponse<T> {
  return (response as AxiosResponse<T>).status !== undefined;
}

interface SignupFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  password2?: string;
  nickname?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { values, handleChange, handleSubmit, resetForm, isSubmitting } =
    useForm({
      email: '',
      nickname: '',
      password: '',
      password2: '',
    });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const passwordToggleHandler1 = () => {
    setShowPassword1((prev) => !prev);
  };

  const passwordToggleHandler2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const validate = (): ValidationErrors => {
    let validationErrors: ValidationErrors = {};

    if (!values.email) {
      validationErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      validationErrors.email = '잘못된 이메일입니다.';
    }

    if (!values.password) {
      validationErrors.password = '비밀번호를 입력해주세요.';
    } else if (values.password.length < 8) {
      validationErrors.password = '비밀번호를 8자 이상 입력해주세요.';
    }

    if (values.password !== values.password2) {
      validationErrors.password2 = '비밀번호가 일치하지 않습니다.';
    } else if (!values.password2) {
      validationErrors.password2 = '비밀번호를 입력해주세요.';
    }

    if (!values.nickname) {
      validationErrors.nickname = '닉네임을 입력해주세요.';
    } else if (values.nickname.length < 2) {
      validationErrors.nickname = '닉네임 2글자 이상 입력해주세요.';
    }

    return validationErrors;
  };

  const submitForm = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await PostSignup({
          email: values.email,
          password: values.password,
          nickname: values.nickname,
        });

        if (isAxiosResponse(res)) {
          // AxiosResponse인 경우만 처리
          if (res.status === 201) {
            resetForm();
            console.log('회원가입 성공', res.data);
          } else {
            console.log('회원가입 실패', res.data);
            setIsModalOpen(true);
          }
        } else {
          // ErrorResponse인 경우 처리
          console.error('회원가입 실패', res.response?.data.message);
          setIsModalOpen(true);
        }
      } catch (e) {
        setIsModalOpen(true);
        console.log('에러', e);
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
          type={showPassword1 ? 'text' : 'password'}
          name="password"
          value={values.password}
          onChange={handleChange}
          className={styles.password1}
        />
        <span
          className={styles.passwordToggle}
          onClick={passwordToggleHandler1}
        >
          {!showPassword1 ? (
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
          type={showPassword2 ? 'text' : 'password'}
          name="password2"
          value={values.password2}
          onChange={handleChange}
          className={styles.password2}
        />
        <span
          className={styles.passwordToggle}
          onClick={passwordToggleHandler2}
        >
          {!showPassword2 ? (
            <Image src="./eyeClose.svg" alt="Close" width={24} height={24} />
          ) : (
            <Image src="./eyeOpen.svg" alt="open" width={24} height={24} />
          )}
        </span>
        {errors.password2 && <p className={styles.error}>{errors.password2}</p>}
      </div>

      <button className={styles.button} type="submit" disabled={isSubmitting}>
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
