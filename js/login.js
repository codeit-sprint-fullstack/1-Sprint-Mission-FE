//email, pw validation

// const emailRegex =
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const pwRegex = '^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$';

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

function emptyInput(field, errorText) {
  const input = form.querySelector(`.${field}`);
  const errorMsg = form.querySelector(`.${field}-field .error-msg`);

  if (input.value.trim('') === '') {
    errorMsg.textContent = errorText;
    input.classList.add('error');
    errorDisplay(input);
  } else {
    input.classList.remove('error');
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
  }
}

function resetError(field) {
  const input = form.querySelector(`.${field}`);
  const errorMsg = form.querySelector(`.${field}-field .error-msg`);
  input.classList.remove('error');
  errorMsg.style.display = 'none';
}

function errorDisplay(input) {
  const errorMsg = input.parentElement.querySelector('.error-msg');
  errorMsg.style.display = input.classList.contains('error') ? 'flex' : 'none';
}
