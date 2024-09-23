'use client';
import { useEffect, useState } from 'react';
import Input from '../inputs/Input';
import { useLoginStore } from '@shared/store/form/login';
import InputErrorText from '../inputs/InputErrorText';
import styles from '@shared/components/Forms/LoginForm.module.css';
import { useFormValidation } from 'src/hooks/useValidation/useFormValidation';
import ActionButton from '../Buttons/ActionButton';
import { usePostSignIn } from 'src/hooks/form/useSignInMutation';

export default function LoginForm() {
  const [visibility, setVisibility] = useState(false);
  const { email, password, setEmail, setPassword } = useLoginStore();
  const { mutate } = usePostSignIn();

  const {
    emailValue,
    onEmailChange,
    passwordValue,
    onPasswordChange,
    errors,
    isValid,
  } = useFormValidation();

  const visibilityToggle = () => {
    setVisibility(!visibility);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    mutate({ email: email, password: password });
  };

  useEffect(() => {
    setEmail(emailValue);
  }, [emailValue]);

  useEffect(() => {
    setPassword(passwordValue);
  }, [passwordValue]);

  const buttonValidation =
    isValid && !(passwordValue === '') && !(emailValue === '');

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
