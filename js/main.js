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

const emptyMsg = [
  { field: 'email', errMsg: '이메일을 입력해주세요.' },
  { field: 'pw', errMsg: '비밀번호를 입력해주세요.' },
  { field: 'confirm-pw', errMsg: '비밀번호를 입력해주세요.' },
  { field: 'name', errMsg: '닉네임을 입력해주세요.' },
];

emptyMsg.forEach((el) => {
  const input = form.querySelector(`.${el.field}-field input`);

  input.addEventListener('focusout', () => {
    emptyInput(el.field, el.errMsg);
  });

  input.addEventListener('focus', () => {
    resetError(el.field, el.errMsg);
  });
});
