import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/AuthProvider';
import Image from 'next/image';
import styles from '@/styles/Login.module.css';
import logo from '@/public/login_logo.png';
import eyeOpen from '@/public/login_eye_open.png';
import eyeClose from '@/public/login_eye_close.png';
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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  const onSubmit = (data) => {
    try {
      login({
        email: data.email,
        password: data.password,
      });

      router.push(`/fleamarket`);
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.logInForm}>
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
        <span className={styles.errorMsg}>잘못된 이메일 형식입니다</span>
      )}
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
          onClick={onShowPassword}
          className={styles.showPasswordIcon}
        />
      </div>

      {errors.password && (
        <span className={styles.errorMsg}>
          비밀번호는 8자 이상이여야 합니다
        </span>
      )}
      <button
        type='submit'
        disabled={!isValid}
        className={!isValid ? styles.submitNone : styles.submit}
      >
        로그인
      </button>
      <div className={styles.otherLogin}>
        <span>간편 로그인하기</span>
        <div className={styles.snsIcon}>
          <Link href='https://www.google.com/'>
            <Image src={googleIcon} alt='구글 로그인' />
          </Link>
          <Link href='https://www.kakaocorp.com/page'>
            <Image src={kakaoIcon} alt='카카오 로그인' />
          </Link>
        </div>
      </div>
      <div className={styles.footer}>
        <span>판마마켓이 처음이신가요?</span>
        <Link href='/register'>
          <span className={styles.register}>회원가입</span>
        </Link>
      </div>
    </form>
  );
}
