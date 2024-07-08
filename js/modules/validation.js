import { emailInput, form, pwInput } from './var.js';
import { USER_DATA } from './userData.js';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const pwRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/;

const nameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$/;

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

//when input.value is empty
function emptyInput(e) {
  const input = e.target;
  const errTexts = {
    email: '이메일을 입력하세요.',
    name: '닉네임을 입력하세요.',
    pw: '비밀번호를 입력하세요.',
    'confirm-pw': '비밀번호를 입력하세요.',
  };

  const error = input.parentElement.querySelector('.error-msg');
  const value = input.value.trim();

  if (value === '') {
    const field = input.classList[1];
    const errMsg = errTexts[field];
    error.textContent = errMsg;
    input.classList.add('error');
    errorDisplay(input);
    return false;
  } else {
    resetError(input);
    return true;
  }
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
          '비밀번호는 영문, 숫자, 특수문자(@ $ ! % * # ? &) 으로 조합해야 합니다.';
        errorDisplay(input);
      } else {
        resetError(input);
      }
    } else {
      resetError(input);
    }
  }
}

//form validation
function formValidity() {
  let allValid = true;
  form.querySelectorAll('input').forEach((input) => {
    if (input.classList.contains('error') || input.value.trim() === '') {
      allValid = false;
    }
  });
  return allValid;
}

//button status
const submitBtn = form.querySelector('button');
function buttonStatus() {
  submitBtn.disabled = !formValidity();
  if (!submitBtn.disabled) {
    submitBtn.style.backgroundColor = 'var(--primary-colour)';
  } else {
    submitBtn.style.backgroundColor = '';
  }
}

function validateLogin() {
  const modal = document.querySelector('#overlay');
  const errMsg = document.querySelector('#modal span');
  let logIn = false;
  USER_DATA.forEach((user) => {
    if (
      emailInput.value.trim() === user.email &&
      pwInput.value.trim() === user.password
    ) {
      logIn = true;
      return;
    }
  });
  if (logIn) {
    window.location.href = '../items';
  } else {
    modal.classList.remove('modal-hidden');
    errMsg.textContent = '없는 이메일, 또는 비밀번호가 일치하지 않습니다.';
  }
}

export {
  emptyInput,
  resetError,
  validateFormat,
  formValidity,
  buttonStatus,
  submitBtn,
  validateLogin,
};
