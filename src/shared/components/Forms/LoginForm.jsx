'use client';
import { useEffect, useState } from 'react';
import Input from '../inputs/Input';
import { useLoginStore } from '@shared/store/form/login';
import InputErrorText from '../inputs/InputErrorText';
import styles from '@shared/components/Forms/LoginForm.module.css';
import ActionButton from '../Buttons/ActionButton';
import { usePostSignIn } from 'src/hooks/form/useSignInMutation';
import { useLoginValidation } from 'src/hooks/useValidation/useLoginValidation';

export default function LoginForm() {
  const [visibility, setVisibility] = useState(false);
  const { email, password, setEmail, setPassword } = useLoginStore();

  const {
    emailValue,
    onEmailChange,
    passwordValue,
    onPasswordChange,
    errors,
    isValid,
  } = useLoginValidation();

  const visibilityToggle = () => {
    setVisibility(!visibility);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        router.push('/');
      }
    } catch (error) {
      alert('로그인 실패' + (error.response?.data.error || error.message));
    }
  };

  useEffect(() => {
    setEmail(emailValue);
  }, [emailValue]);

  useEffect(() => {
    setPassword(passwordValue);
  }, [passwordValue]);

  const buttonValidation =
    isValid && !(passwordValue === '') && !(emailValue === '');

  console.log(isValid);

  return (
    <form className={styles['form']}>
      <div className={styles['email']}>
        <label>이메일</label>
        <Input
          page={'login-email'}
          option={'normal'}
          name={'email'}
          placeholder={'이메일을 입력해주세요'}
          value={emailValue}
          onChange={onEmailChange}
        />
        {errors.email && (
          <InputErrorText content={errors.email.message} page={'login'} />
        )}
      </div>
      <div className={styles['password']}>
        <label>비밀번호</label>
        <Input
          page={'login-password'}
          option={'password'}
          name={'password'}
          placeholder={'비밀번호를 입력해주세요'}
          visibility={visibility}
          onClick={visibilityToggle}
          value={passwordValue}
          onChange={onPasswordChange}
        />
        {errors.password && (
          <InputErrorText content={errors.password.message} page={'login'} />
        )}
      </div>
      <ActionButton
        content={'로그인'}
        style={'login-form-button'}
        disabled={!buttonValidation}
        onClick={handleLogin}
      />
    </form>
  );
}
