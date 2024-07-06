const email = document.getElementById('email');
const emailError = document.querySelector('.email.errorMessage');
const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

email.addEventListener('focusout',() => {
  if(!email.value){
    email.classList.add('error');
    emailError.textContent = '이메일을 입력해주세요.';
  } else if(!emailReg.test(email.value)) {
    email.classList.add('error');
    emailError.textContent = '잘못된 이메일 형식입니다.';
  } else {
    email.classList.remove('error');
    emailError.textContent = '';
  }
});

const password = document.getElementById('password');
const passwordError = document.querySelector('.password.errorMessage');

password.addEventListener('focusout', () => {
  if(!password.value){
    password.classList.add('error');
    passwordError.textContent = '비밀번호를 입력해주세요.';
  } else if(String(password.value).length < 8){
    password.classList.add('error');
    passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.';
  } else {
    password.classList.remove('error');
    passwordError.textContent = '';
  }
});

