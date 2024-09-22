import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/AuthProvider';
import { postUserSingUpApi } from '@/utils/api/userApi.js';
import Image from 'next/image';
import styles from '@/styles/Login.module.css';
import eyeOpen from '@/public/login_eye_open.png';
import eyeClose from '@/public/login_eye_close.png';
import logo from '@/public/login_logo.png';
import kakaoIcon from '@/public/sns_icon/ic_kakao.png';
import googleIcon from '@/public/sns_icon/ic_google.png';
import { useState } from 'react';

export default function LogInPage() {
  const { login, user } = useAuth();
  const [canShowPassword, setCanShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState({
    type: 'password',
    imag: eyeClose,
  });
  const [canShowPasswordConfirm, setCanShowPasswordConfirm] = useState(false);
  const [passwordConfirmValue, setPasswordConfirmValue] = useState({
    type: 'password',
    imag: eyeClose,
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const emailRules = {
  //   required: 'Email ID를 입력해주세요',
  //   pattern: {
  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //     message: '올바른 이메일 형식이 아닙니다.',
  //   },
  //   minLength: {
  //     value: 6,
  //     message: '이메일은 최소 6자 이상이어야 합니다.',
  //   },
  // };

  const onShowPassword = () => {
    setCanShowPassword((prev) => !prev);
    if (canShowPassword === true) {
      setPasswordValue({ type: 'text', imag: eyeOpen });
    } else {
      setPasswordValue({ type: 'password', imag: eyeClose });
    }
  };

  const onShowPasswordConfirm = () => {
    setCanShowPasswordConfirm((prev) => !prev);
    if (canShowPasswordConfirm === true) {
      setPasswordConfirmValue({ type: 'text', imag: eyeOpen });
    } else {
      setPasswordConfirmValue({ type: 'password', imag: eyeClose });
    }
  };

  const onSubmit = async (data) => {
    const resData = await postUserSingUpApi({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });

    const res = login({
      email: data.email,
      password: data.password,
    });

    router.push(`/mypage`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
      <Image src={logo} alt='로고' className={styles.logo} property />
      <div className={styles.text}>이메일</div>
      <input
        className={errors.email ? styles.inputError : styles.input}
        placeholder='email'
        {...register('email', {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
        })}
      />
      {errors.email && (
        <span className={styles.errorMsg}> 잘못된 이메일 형식입니다</span>
      )}
      <div className={styles.text}>닉네임</div>
      <input
        className={styles.input}
        placeholder='nickname'
        {...register('text', {
          required: true,
        })}
      />
      <div className={styles.text}>비밀번호</div>
      <div className={styles.passwordLayout}>
        <input
          className={errors.password ? styles.inputError : styles.input}
          placeholder='password'
          type={passwordValue.type}
          {...register('password', { required: true, minLength: 8 })}
        />
        <Image
          src={passwordValue.imag}
          alt='비밀번호 보이기'
          onClick={(e) => {
            e.preventDefault(); // 기본 동작 방지
            onShowPassword();
          }}
          className={styles.showPasswordIcon}
        />
      </div>
      {errors.password && (
        <span className={styles.errorMsg}>
          비밀번호는 8자 이상이여야 합니다
        </span>
      )}
      <div className={styles.text}>비밀번호 확인</div>
      <div className={styles.passwordLayout}>
        <input
          className={errors.password ? styles.inputError : styles.input}
          placeholder='password'
          type={passwordConfirmValue.type}
          {...register('passwordConfirmation', {
            required: true,
            minLength: 8,
          })}
        />
        <Image
          src={passwordConfirmValue.imag}
          alt='비밀번호 보이기'
          onClick={onShowPasswordConfirm}
          className={styles.showPasswordIcon}
        />
      </div>
      {errors.password && (
        <span className={styles.errorMsg}>
          비밀번호는 8자 이상이여야 합니다
        </span>
      )}
      <button type='submit' className={styles.submit}>
        회원가입
      </button>
      <div className={styles.otherLogin}>
        <span>간편 로그인하기</span>
        <div className={styles.snsIcon}>
          <Image src={googleIcon} alt='구글 로그인' />
          <Image src={kakaoIcon} alt='카카오 로그인' />
        </div>
      </div>
      <div className={styles.footer}>
        <span>이미 회원이신가요?</span>
        <Link href='/login'>
          <span className={styles.register}>로그인</span>
        </Link>
      </div>
    </form>
  );
}
