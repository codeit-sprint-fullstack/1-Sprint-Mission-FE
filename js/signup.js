import { eyeIconToggle } from './modules/eyeIcon.js';
import { form, modalBtn, modal, modalMsg } from './modules/var.js';
// import { USER_DATA } from './modules/userData.js';
import {
  emptyInput,
  resetError,
  buttonStatus,
  signUpFormat,
  validateSignUp,
  confirmPw,
} from './modules/validation.js';

eyeIconToggle();

//add eventListenr to validate input formats

form.querySelectorAll('input').forEach((input) => {
  if (input) {
    input.addEventListener('focusout', (e) => {
      emptyInput(e);
      signUpFormat(e);
      buttonStatus();
    });
    input.addEventListener('focus', () => {
      resetError(input);
    });
    input.addEventListener('input', () => {
      resetError(input);
      buttonStatus();
    });
  }
});

buttonStatus();

//add eventListener to validate submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (confirmPw()) {
    validateSignUp();
  }
});

modalBtn.addEventListener('click', () => {
  if (modalMsg.classList.contains('fail')) {
    modal.classList.add('modal-hidden');
    modalMsg.classList.remove('fail');
    window.location.href = './';
  } else if (modalMsg.classList.contains('success')) {
    modal.classList.add('modal-hidden');
    modalMsg.classList.remove('sucess');

    window.location.href = '../login';
  }
});
