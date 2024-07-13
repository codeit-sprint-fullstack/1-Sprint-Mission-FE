import { input, inputPw, button, buttonType } from '../component/mould.js';
import * as handler from '../component/inputHandler.js';

const form = document.querySelector('#form');

const inputPropList = [
  {
    id: 'email',
    type: 'email',
    label: '이메일',
    holder: '이메일을 입력해주세요.',
  },
];

const inputPwPropList = [
  {
    id: 'password',
    type: 'password',
    label: '비밀번호',
    holder: '비밀번호를 입력해주세요.',
  },
];

const signUpButton = new buttonType('btn', '로그인');

const render = () => {
  form.innerHTML = `
    ${inputPropList.map(input).join('')}
    ${inputPwPropList.map(inputPw).join('')}
    ${button(...Object.values(signUpButton))}
      `;
};

render();

const passwordBox = document.querySelector('.inputBox.password');
const emailBox = document.querySelector('.inputBox.email');
const btn = document.querySelector('.btn');
const modalBtn = document.querySelector('.modalBtn');

emailBox.addEventListener('focusout', handler.checkEmail);
passwordBox.addEventListener('focusout', handler.checkPassword);
passwordBox.addEventListener('focusin', handler.addEye);
form.addEventListener('input', handler.LoginBtnAbled);
btn.addEventListener('click', handler.checkLogin);
modalBtn.addEventListener('click', handler.modalBtnClick);
