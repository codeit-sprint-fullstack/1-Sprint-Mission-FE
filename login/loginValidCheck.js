const email = document.getElementById('email');
const emailError = document.querySelector('.email.errorMessage');
const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const password = document.getElementById('password');
const passwordError = document.querySelector('.password.errorMessage');

const loginButton = document.querySelector('.loginButton');

let emailValid = false;
let passwordValid = false;

/*버튼 비활성화*/
function loginButtonStatus(){
  console.log(`emailValid: ${emailValid}, passwordValid: ${passwordValid}`);
  if(emailValid && passwordValid) loginButton.disabled = false;
  else loginButton.disabled = true;
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
  loginButtonStatus();
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
  
  loginButtonStatus();
});

