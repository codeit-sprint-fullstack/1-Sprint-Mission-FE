const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const pwRegex =
  /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,14}$/;

const nameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$/;

const form = document.querySelector('form');
const emailField = form.querySelector('.email-field');
const emailInput = emailField.querySelector('#user-email');
const eErrorMsg = emailField.querySelector('.error-msg');
const pwField = form.querySelector('.pw-field');
const cPwField = form.querySelector('.confirm-pw-field');
const pwInput = document.querySelector('#pw');
const confirmPwInput = document.querySelector('#confirm-pw');
const nameField = form.querySelector('.name-field');
const userName = document.querySelector('#name');

function emptyInput(e, errorText) {
  const input = e.target;
  const errorMsg = input.parentElement.querySelector('.error-msg');

  if (input.value.trim() === '') {
    errorMsg.textContent = errorText;
    input.classList.add('error');
    errorDisplay(input);
  } else {
    resetError(input);
  }
}

function resetError(input) {
  const errorMsg = input.parentElement.querySelector('.error-msg');
  input.classList.remove('error');
  errorMsg.textContent = '';
  errorMsg.style.display = 'none';
}

function errorDisplay(input) {
  const errorMsg = input.parentElement.querySelector('.error-msg');
  errorMsg.style.display = input.classList.contains('error') ? 'flex' : 'none';
}

function validateFormat(e) {
  const input = e.target;
  const errorMsg = input.parentElement.querySelector('.error-msg');
  if (input.value.trim() !== '') {
    if (input.classList.contains('email') && !input.value.match(emailRegex)) {
      input.classList.add('error');
      errorMsg.textContent = '잘못된 이메일 형식입니다.';
      errorDisplay(input);
    } else if (input.classList.contains('name')) {
      if (input.value.length < 3 || input.value.length > 20) {
        input.classList.add('error');
        errorMsg.textContent = '이름은 3자에서 20자 사이로 입력해주세요.';
        errorDisplay(input);
      } else if (!input.value.match(nameRegex)) {
        input.classList.add('error');
        errorMsg.textContent =
          '이름은 영문 대소문자, 숫자, 밑줄(_), 한글만 포함할 수 있습니다.';
        errorDisplay(input);
      } else {
        resetError(input);
      }
    } else if (
      input.classList.contains('pw') ||
      input.classList.contains('confirm-pw')
    ) {
      if (input.value.length < 8 || input.value.length > 15) {
        input.classList.add('error');
        errorMsg.textContent = '비밀번호는 8이상 14이하로 입력해주세요.';
        errorDisplay(input);
      } else if (!input.value.match(pwRegex)) {
        input.classList.add('error');
        errorMsg.textContent =
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
export {
  form,
  emailField,
  emailInput,
  eErrorMsg,
  pwField,
  cPwField,
  pwInput,
  confirmPwInput,
  emptyInput,
  resetError,
  errorDisplay,
  nameField,
  userName,
  validateFormat,
};
