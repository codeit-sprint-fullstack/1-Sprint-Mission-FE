import { useEffect, useState } from 'react';
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
import { AuthModal } from '@/utils/Modal';

export default function LogInPage() {
  const { login, user } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState({
    type: 'password',
    imag: eyeClose,
  });
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [passwordConfirmValue, setPasswordConfirmValue] = useState({
    type: 'password',
    imag: eyeClose,
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm();

  const onShowPassword = () => {
    setIsShowPassword((prev) => !prev);
    setPasswordValue({
      type: isShowPassword ? 'password' : 'text',
      imag: isShowPassword ? eyeClose : eyeOpen,
    });
  };

  const onShowPasswordConfirm = () => {
    setIsShowPasswordConfirm((prev) => !prev);
    setPasswordConfirmValue({
      type: isShowPasswordConfirm ? 'password' : 'text',
      imag: isShowPasswordConfirm ? eyeClose : eyeOpen,
    });
  };

  const onSubmit = async (data) => {
    const resData = await postUserSingUpApi({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });

    if (resData && resData.accessToken) {
      router.push('/login');
      console.log(resData);
    } else {
      setErrorMsg(resData); // 에러 메시지 설정
      setIsShowModal(true); // 모달 표시
    }
  };

  useEffect(() => {
    const password = watch('password');
    const passwordConfirmation = watch('passwordConfirmation');

    if (password && passwordConfirmation && password !== passwordConfirmation) {
      setError('passwordConfirmation', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      clearErrors('passwordConfirmation');
    }
  }, [watch('password'), watch('passwordConfirmation'), setError, clearErrors]);

  const isFormValid = isValid && !errors.passwordConfirmation;

  return (
    <>
      {isShowModal && (
        <AuthModal errorMsg={errorMsg} setIsShowModal={setIsShowModal} />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
        <Image src={logo} alt='로고' className={styles.logo} />
        <div className={styles.text}>이메일</div>
        <input
          className={errors.email ? styles.inputError : styles.input}
          placeholder='email'
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
        />
        {errors.email && (
          <span className={styles.errorMsg}>{errors.email.message}</span>
        )}

        <div className={styles.text}>닉네임</div>
        <input
          className={styles.input}
          placeholder='nickname'
          {...register('nickname', {
            required: '닉네임을 입력해주세요.',
          })}
        />
        {errors.nickname && (
          <span className={styles.errorMsg}>{errors.nickname.message}</span>
        )}

        <div className={styles.text}>비밀번호</div>
        <div className={styles.passwordLayout}>
          <input
            className={errors.password ? styles.inputError : styles.input}
            placeholder='password'
            type={passwordValue.type}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이여야 합니다.',
              },
            })}
          />
          <Image
            src={passwordValue.imag}
            alt='비밀번호 보이기'
            onClick={(e) => {
              e.preventDefault();
              onShowPassword();
            }}
            className={styles.showPasswordIcon}
          />
        </div>
        {errors.password && (
          <span className={styles.errorMsg}>{errors.password.message}</span>
        )}

        <div className={styles.text}>비밀번호 확인</div>
        <div className={styles.passwordLayout}>
          <input
            className={
              errors.passwordConfirmation ? styles.inputError : styles.input
            }
            placeholder='password'
            type={passwordConfirmValue.type}
            {...register('passwordConfirmation', {
              required: '비밀번호 확인을 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이여야 합니다.',
              },
            })}
          />
          <Image
            src={passwordConfirmValue.imag}
            alt='비밀번호 보이기'
            onClick={(e) => {
              e.preventDefault();
              onShowPasswordConfirm();
            }}
            className={styles.showPasswordIcon}
          />
        </div>
        {errors.passwordConfirmation && (
          <span className={styles.errorMsg}>
            {errors.passwordConfirmation.message}
          </span>
        )}

        <button
          disabled={!isFormValid}
          type='submit'
          className={!isFormValid ? styles.submitNone : styles.submit}
        >
          회원가입
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
          <span>이미 회원이신가요?</span>
          <Link href='/login'>
            <span className={styles.register}>로그인</span>
          </Link>
        </div>
      </form>
    </>
  );
}
