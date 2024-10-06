'use client';
import { useEffect, useState } from 'react';
import Input from '../inputs/Input';
import InputErrorText from '../inputs/InputErrorText';
import styles from '@shared/components/Forms/SignupForm.module.css';
import { useFormValidation } from 'src/hooks/useValidation/useFormValidation';
import ActionButton from '../Buttons/ActionButton';
import { useSignupStore } from '@shared/store/form/signup';
import { usePostSignup } from 'src/hooks/form/useSignupMutation';

export default function SignupForm() {
  const [visibility, setVisibility] = useState({
    password: false,
    passwordConfirmation: false,
  });
  const {
    email,
    password,
    nickname,
    passwordConfirmation,
    setEmail,
    setNickname,
    setPassword,
    setPasswordConfirmation,
  } = useSignupStore();

  const { mutate } = usePostSignup();

  const {
    emailValue,
    onEmailChange,
    passwordValue,
    onPasswordChange,
    nicknameValue,
    onNicknameChange,
    passwordConfirmationValue,
    onPasswordConfirmationChange,
    errors,
    isValid,
  } = useFormValidation();

  const visibilityToggle = (target) => {
    setVisibility((visibility) => ({
      ...visibility,
      [target]: !visibility[target],
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    mutate({
      email: email,
      password: password,
      nickname: nickname,
      passwordConfirmation: passwordConfirmation,
    });
  };

  useEffect(() => {
    setEmail(emailValue);
  }, [emailValue]);

  useEffect(() => {
    setPassword(passwordValue);
  }, [passwordValue]);

  useEffect(() => {
    setNickname(nicknameValue);
  }, [nicknameValue]);

  useEffect(() => {
    setPasswordConfirmation(passwordConfirmationValue);
  }, [passwordConfirmationValue]);

  const buttonValidation =
    isValid &&
    !(passwordValue === '') &&
    !(emailValue === '') &&
    !(passwordConfirmationValue === '') &&
    !(nicknameValue === '');

  return (
    <form className={styles['form']}>
      <div className={styles['input-container']}>
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
      <div className={styles['input-container']}>
        <label>닉네임</label>
        <Input
          page={'login-nickname'}
          option={'normal'}
          name={'nickname'}
          placeholder={'닉네임을 입력해주세요'}
          value={nicknameValue}
          onChange={onNicknameChange}
        />
        {errors.nickname && (
          <InputErrorText content={errors.nickname.message} page={'login'} />
        )}
      </div>
      <div className={styles['input-container']}>
        <label>비밀번호</label>
        <Input
          page={'login-password'}
          option={'password'}
          name={'password'}
          placeholder={'비밀번호를 입력해주세요'}
          visibility={visibility.password}
          onClick={() => visibilityToggle('password')}
          value={passwordValue}
          onChange={onPasswordChange}
        />
        {errors.password && (
          <InputErrorText content={errors.password.message} page={'login'} />
        )}
      </div>
      <div className={styles['input-container']}>
        <label>비밀번호 확인</label>
        <Input
          page={'login-password-confirmation'}
          option={'password'}
          name={'passwordConfirmation'}
          placeholder={'비밀번호를 입력해주세요'}
          visibility={visibility.passwordConfirmation}
          onClick={() => visibilityToggle('passwordConfirmation')}
          value={passwordConfirmationValue}
          onChange={onPasswordConfirmationChange}
        />
        {errors.passwordConfirmation && (
          <InputErrorText
            content={errors.passwordConfirmation.message}
            page={'login'}
          />
        )}
      </div>
      <ActionButton
        content={'회원가입'}
        style={'signup-form-button'}
        disabled={!buttonValidation}
        onClick={handleSignup}
      />
    </form>
  );
}
