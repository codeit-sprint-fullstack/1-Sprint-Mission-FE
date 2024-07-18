const email = document.getElementById('email');
const emailError = document.querySelector('.email.error-message');
const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const password = document.getElementById('password');
const passwordError = document.querySelector('.password.error-message');
const checkPassword = document.getElementById('check-password');
const checkPasswordError = document.querySelector('.check-password.error-message');
const nickName = document.getElementById('name');
const nickNameError = document.querySelector('.name.error-message');

const joinButton = document.querySelector('.join-button');

let emailValid = false;
let passwordValid = false;
let checkPasswordValid = false;
let nickNameValid = false;

/*버튼 비활성화*/
function joinButtonStatus(){
  if(emailValid && passwordValid && checkPasswordValid && nickNameValid)
    joinButton.disabled = false;
  else joinButton.disabled = true;
}
/*이메일 검사*/
email.addEventListener('input',() => {
  if(!email.value){
    email.classList.add('error');
    emailError.textContent = '이메일을 입력해주세요.';
    emailValid = false;
  } else if(!emailReg.test(email.value)) {
    email.classList.add('error');
    emailError.textContent = '잘못된 이메일 형식입니다.';
    emailValid = false;
  } else {
    email.classList.remove('error');
    emailError.textContent = '';
    emailValid = true;
  }
  joinButtonStatus();
});
/*비밀번호 검사*/
password.addEventListener('input', () => {
  if(!password.value){
    password.classList.add('error');
    passwordError.textContent = '비밀번호를 입력해주세요.';
    passwordValid = false;
  } else if(String(password.value).length < 8){
    password.classList.add('error');
    passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.';
    passwordValid = false;
  } else {
    password.classList.remove('error');
    passwordError.textContent = '';
    passwordValid = true;
  }
  /* 확인 칸에 입력값이 있을 때*/
  if(checkPassword.value && (password.value === checkPassword.value)){
    checkPassword.classList.remove('error');
    checkPasswordError.textContent = '';
    checkPasswordValid = true;
  }
  joinButtonStatus();
});
/*비밀번호 확인*/
checkPassword.addEventListener('input', () => {
  if(!checkPassword.value){
    checkPassword.classList.add('error');
    checkPasswordError.textContent = '비밀번호를 입력해주세요.';
    checkPasswordValid = false;
  } else if(checkPassword.value !== password.value) {
    checkPassword.classList.add('error');
    checkPasswordError.textContent = '비밀번호가 일치하지 않습니다.';
    checkPasswordValid = false;
  } else {
    checkPassword.classList.remove('error');
    checkPasswordError.textContent = '';
    checkPasswordValid = true;
  }
  joinButtonStatus();
});
/*닉네임 확인*/
nickName.addEventListener('input', () => {
  if(!nickName.value){
    nickName.classList.add('error');
    nickNameError.textContent = '닉네임을 입력해주세요.';
    nickNameValid = false;
  } else {
    nickName.classList.remove('error');
    nickNameError.textContent = '';
    nickNameValid = true;
  }
  joinButtonStatus();
});
