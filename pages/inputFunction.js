window.onload = function () {}; //onload end

// 패스워드입력 눈 이미지 토글

const password = document.getElementById('password');
const eyeToggle = document.querySelector('.eyeToggle');
function addEyeToggle() {
  eyeToggle.setAttribute('style', 'visibility:visible');
}

function removeEyeToggle() {
  eyeToggle.removeAttribute('style', 'visibility:visible');
  eyeToggle.removeAttribute('style', 'visibility:hidden');
}

password.addEventListener('focusin', addEyeToggle);
password.addEventListener('focusout', removeEyeToggle);

// 패스워드 눈 클릭 이벤트

const eye = document.getElementById('eye');
const eyeSlash = document.getElementById('eyeSlash');
let passwordVisible = false;

eyeToggle.addEventListener('click', function () {
  if (passwordVisible) {
    password.type = 'password';
    eye.setAttribute('style', 'visibility: hidden');
    eyeSlash.setAttribute('style', 'visibility:visible');
  } else {
    password.type = 'text';
    eye.setAttribute('style', 'visibility:visible');
    eyeSlash.setAttribute('style', 'visibility: hidden');
  }
  passwordVisible = !passwordVisible;
});

eye.onblur = function EEE(e) {
  eye.setAttribute('style', 'visibility: hidden');
};
eyeSlash.onblur = function EEE(e) {
  eyeSlash.setAttribute('style', 'visibility: hidden');
};

function removeEyes() {
  eye.setAttribute('style', 'visibility: hidden');
  eyeSlash.setAttribute('style', 'visibility:hidden');
}

eye.addEventListener('onblur', removeEyes);
eyeSlash.addEventListener('onblur', removeEyes);

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
