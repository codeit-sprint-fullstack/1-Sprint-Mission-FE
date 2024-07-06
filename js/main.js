import { eyeIconToggle } from './modules/eyeIcon.js';
import {
  form,
  emailField,
  emailInput,
  eErrorMsg,
  pwField,
  cPwField,
  pwInput,
  confirmPwInput,
  emptyInput,
  resetError,
  errorDisplay,
  nameField,
  userName,
} from './modules/validation.js';

eyeIconToggle();

// Error msg for empty value
emailInput.addEventListener('focusout', function () {
  emptyInput('email', '이메일을 입력해주세요.');
});

emailInput.addEventListener('focus', function () {
  resetError('email');
});

pwInput.addEventListener('focusout', function () {
  emptyInput('pw', '비밀번호를 입력해주세요.');
});

pwInput.addEventListener('focus', function () {
  resetError('pw');
});

confirmPwInput.addEventListener('focusout', function () {
  emptyInput('confirm-pw', '비밀번호를 입력해주세요.');
});

confirmPwInput.addEventListener('focus', function () {
  resetError('confirm-pw');
});

userName.addEventListener('focusout', function () {
  emptyInput('name', '닉네임을 입력해주세요.');
});

userName.addEventListener('focus', function () {
  resetError('name');
});
