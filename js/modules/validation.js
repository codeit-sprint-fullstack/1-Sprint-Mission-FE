import { form } from './var.js';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const pwRegex =
  /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,14}$/;

const nameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$/;

//when input.value is empty
function emptyInput(e, errorMsg) {
  const input = e.target;
  const error = input.parentElement.querySelector('.error-msg');
  const value = input.value.trim();

  if (value === '') {
    error.textContent = errorMsg;
    input.classList.add('error');
    errorDisplay(input);
  } else {
    resetError(input);
  }
}

//remove .error class on input tag
function resetError(input) {
  const errorMsg = input.parentElement.querySelector('.error-msg');
  input.classList.remove('error');
  errorMsg.textContent = '';
  errorMsg.style.display = 'none';
}

//diplay error msg visible
function errorDisplay(input) {
  const errorMsg = input.parentElement.querySelector('.error-msg');
  errorMsg.style.display = input.classList.contains('error') ? 'flex' : 'none';
}

//when input.value is not empty
function validateFormat(e) {
  const input = e.target;
  const error = input.parentElement.querySelector('.error-msg');
  const value = input.value.trim();

  if (value !== '') {
    if (input.classList.contains('email') && !emailRegex.test(value)) {
      input.classList.add('error');
      error.textContent = '잘못된 이메일 형식입니다.';
      errorDisplay(input);
    } else if (input.classList.contains('name')) {
      if (value.length < 3 || value.length > 20) {
        input.classList.add('error');
        error.textContent = '이름은 3자에서 20자 사이로 입력해주세요.';
        errorDisplay(input);
      } else if (!nameRegex.test(value)) {
        input.classList.add('error');
        error.textContent =
          '이름은 영문 대소문자, 숫자, 밑줄(_), 한글만 포함할 수 있습니다.';
        errorDisplay(input);
      } else {
        resetError(input);
      }
    } else if (
      input.classList.contains('pw') ||
      input.classList.contains('confirm-pw')
    ) {
      if (value.length < 8 || value.length > 15) {
        input.classList.add('error');
        error.textContent = '비밀번호는 8이상 14이하로 입력해주세요.';
        errorDisplay(input);
      } else if (!pwRegex.test(value)) {
        input.classList.add('error');
        error.textContent =
          '비밀번호는 영문 대소문자, 숫자, 특수문자(@ $ ! % * # ? & 중 하나)를 포함해야 합니다.';
        errorDisplay(input);
      } else {
        resetError(input);
      }
    } else {
      resetError(input);
    }
  }
}

const submitBtn = form.querySelector('button');

function formValidity(input) {
  let allValid = true;

  if (input.classList.contains('error') || input.value.trim() === '') {
    allValid = false;
  }
  submitBtn.disabled = !allValid;
}

function buttonStatus() {
  if (!submitBtn.disabled) {
    submitBtn.style.backgroundColor = 'var(--primary-colour)';
  }
}

export { emptyInput, resetError, validateFormat, formValidity, buttonStatus };
