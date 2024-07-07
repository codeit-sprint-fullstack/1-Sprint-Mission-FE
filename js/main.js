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
  validateFormat,
} from './modules/validation.js';

eyeIconToggle();

const emptyMsg = [
  { field: 'email', errMsg: '이메일을 입력해주세요.' },
  { field: 'pw', errMsg: '비밀번호를 입력해주세요.' },
  { field: 'confirm-pw', errMsg: '비밀번호를 입력해주세요.' },
  { field: 'name', errMsg: '닉네임을 입력해주세요.' },
];
//add eventListenr
emptyMsg.forEach((el) => {
  const input = form.querySelector(`.${el.field}-field input`);

  if (input) {
    input.addEventListener('focusout', (e) => {
      emptyInput(e, el.errMsg);
      validateFormat(e);
    });

    input.addEventListener('focus', () => {
      resetError(input);
    });
  } else {
    console.log(
      "no nickname and confirm password field in login page. it's all good."
    );
  }
});
