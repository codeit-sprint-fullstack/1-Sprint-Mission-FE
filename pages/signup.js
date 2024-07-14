import { input, inputPw, button, buttonType } from '../component/template.js';
import * as handler from '../component/inputHandler.js';

const form = document.querySelector('#form');

const inputPropList = [
  {
    id: 'email',
    type: 'email',
    label: '이메일',
    holder: '이메일을 입력해주세요.',
  },
  {
    id: 'userName',
    type: 'text',
    label: '닉네임',
    holder: '닉네임을 입력해주세요.',
  },
];

const inputPwPropList = [
  {
    id: 'password',
    type: 'password',
    label: '비밀번호',
    holder: '비밀번호를 입력해주세요.',
  },
  {
    id: 'rePassword',
    type: 'password',
    label: '비밀번호 확인',
    holder: '비밀번호를 다시 한 번 입력해주세요.',
  },
];

const signUpButton = new buttonType('btn', '회원가입');

const render = () => {
  form.innerHTML = `
  ${inputPropList.map(input).join('')}
  ${inputPwPropList.map(inputPw).join('')}
  ${button(...Object.values(signUpButton))}
    `;
};

render();

const btn = document.querySelector('.btn');
const emailBox = document.querySelector('.inputBox.email');
const userBox = document.querySelector('.inputBox.userName');
const passwordBox = document.querySelector('.inputBox.password');
const rePasswordBox = document.querySelector('.inputBox.rePassword');
const modalBtn = document.querySelector('.modalBtn');
const signupCompleteBtn = document.querySelector('.signupCompleteBtn');

emailBox.addEventListener('focusout', handler.checkEmail);
userBox.addEventListener('focusout', handler.checkUser);
passwordBox.addEventListener('focusout', handler.checkPassword);
rePasswordBox.addEventListener('focusout', handler.checkRePassword);

passwordBox.addEventListener('focusin', handler.addEye);
rePasswordBox.addEventListener('focusin', handler.addReEye);

form.addEventListener('input', handler.btnAbled);
btn.addEventListener('click', handler.checkData);
modalBtn.addEventListener('click', handler.modalBtnClick);
signupCompleteBtn.addEventListener('click', handler.signUpComplete);
