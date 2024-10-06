import { useController, useForm } from 'react-hook-form';

export function useSignupValidation() {
  const {
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: 'onChange',
  });

  const {
    field: { value: emailValue, onChange: onEmailChange },
  } = useController({
    name: 'email',
    control,
    defaultValue: '',
    rules: {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: '잘못된 이메일입니다.',
      },
    },
  });

  const {
    field: { value: passwordValue, onChange: onPasswordChange },
  } = useController({
    name: 'password',
    control,
    defaultValue: '',
    rules: {
      minLength: {
        value: 8,
        message: '비밀번호를 8자 이상 입력해주세요',
      },
    },
  });

  const {
    field: { value: nicknameValue, onChange: onNicknameChange },
  } = useController({
    name: 'nickname',
    control,
    defaultValue: '',
    rules: {
      required: '닉네임을 입력해주세요',
    },
  });

  const {
    field: {
      value: passwordConfirmationValue,
      onChange: onPasswordConfirmationChange,
    },
  } = useController({
    name: 'passwordConfirmation',
    control,
    defaultValue: '',
    rules: {
      validate: (value) =>
        value === passwordValue || '비밀번호가 일치하지 않습니다.',
    },
  });

  return {
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
  };
}
