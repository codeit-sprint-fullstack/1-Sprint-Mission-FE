window.onload = function () {}; //onload end

// 패스워드입력 이미지 토글

const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');
const eye = document.getElementById('eye');
const reEye = document.getElementById('reEye');
function addEye() {
  eye.setAttribute('style', 'display:block');
}

function removeEye() {
  eye.removeAttribute('style', 'display:block');
}

password.addEventListener('focusin', addEye);
password.addEventListener('focusout', removeEye);

function addReEye() {
  reEye.setAttribute('style', 'display:block');
}

function removeReEye() {
  reEye.removeAttribute('style', 'display:block');
}

rePassword.addEventListener('focusin', addReEye);
rePassword.addEventListener('focusout', removeReEye);

// 입력 에러 생성

const emailError = document.getElementById('email');
const update = document.querySelector('.update');
const error = document.querySelector('.error');

emailError.addEventListener('input', inputEmail);

function inputEmail(e) {
  const input = e.target.value;
  const expression = /^\S+@\S+$/;
  if (input && expression.test(input)) {
    update.classList.add('success');
    update.classList.remove('failure');
    error.classList.remove('failure');
  } else {
    update.classList.add('failure');
    update.classList.remove('success');
    error.classList.add('failure');
  }
}
