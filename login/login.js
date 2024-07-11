// 비밀번호 숨기기/표시하기
import { password, passIcon, showHide } from '../components/showHide.js';
passIcon.addEventListener('click', () => showHide(password,passIcon));

// 이메일 유효성 검사
import { failureMessage, failureMessageTwo, input, userEmail } from '../components/emailValid.js';
import { pattern } from '../components/regex.js'

userEmail.addEventListener('focusout', () => {
  if (userEmail.value === '') {
    failureMessage.classList.remove('hide');
    failureMessageTwo.classList.add('hide');
    input.classList.add('invalid-value');
    input.classList.remove('valid-value');
  } else if (!pattern.test(userEmail.value)) {      
    failureMessage.classList.add('hide');
    failureMessageTwo.classList.remove('hide');
    input.classList.add('invalid-value');
    input.classList.remove('valid-value');
  }
});
userEmail.addEventListener('keyup', () => {
  if (pattern.test(userEmail.value)) {
      failureMessage.classList.add('hide');
      failureMessageTwo.classList.add('hide');
      userEmail.classList.remove('invalid-value');
      userEmail.classList.add('valid-value');
    }
});

// 비밀번호 유효성 검사
const failureMessageThree = document.querySelector('.failure-message3');
const failureMessageFour = document.querySelector('.failure-message4');

password.addEventListener('focusout', () => {
  if (password.value === '') {
    failureMessageThree.classList.remove('hide');
    failureMessageFour.classList.add('hide');
    password.classList.add('invalid-value');
    password.classList.remove('valid-value');
  } else if (password.value.length < 8) {
    failureMessageThree.classList.add('hide');
    failureMessageFour.classList.remove('hide');
    password.classList.add('invalid-value');
    password.classList.remove('valid-value');
    }
});

password.addEventListener('keyup', () => {
  if (password.value.length >= 8) {
      failureMessageThree.classList.add('hide');
      failureMessageFour.classList.add('hide');
      password.classList.remove('invalid-value');
      password.classList.add('valid-value');
    }
});

// 버튼 활성화
const loginBtn = document.querySelector('.login_btn');

function btnActivate() {
  switch((pattern.test(userEmail.value)) && password.value.length >= 8) {
    case false : 
    loginBtn.disabled = true; 
    loginBtn.classList.remove('loginBtn_activate')
    break;
    
    case true :
    loginBtn.disabled = false;
    loginBtn.classList.add('loginBtn_activate')   
    break;
  }
}

userEmail.addEventListener('keyup', btnActivate);
password.addEventListener('keyup', btnActivate);

// 유저 데이터 베이스, 모달
const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');
import { USER_DATA } from '../components/userData.js';

loginBtn.addEventListener('click', () => {
  const user = USER_DATA.find(userData => userData.email === userEmail.value.trim())
  if (!user) {
    modal.classList.remove('hidden') 
  } else if (user.password === password.value) {
    window.location.href = '../item/index.html'
  } else {
    modal.classList.remove('hidden') 
  }
});

modalCloseButton.addEventListener('click', () => {
  modal.classList.add('hidden')
});

// 인풋 포커스
import focusIn from '../components/focus.js';
userEmail.addEventListener('focusin', () => {focusIn(input)});
password.addEventListener('focusin', () => {focusIn(password)});
