import { eyeIconToggle } from './modules/eyeIcon.js';
import { form, modal, modalBtn } from './modules/var.js';
// import { USER_DATA } from './modules/userData.js';
import {
  emptyInput,
  resetError,
  logInFormat,
  buttonStatus,
  validateLogIn,
  confirmPw,
} from './modules/validation.js';

eyeIconToggle();

//add eventListenr validate input formats

form.querySelectorAll('input').forEach((input) => {
  if (input) {
    input.addEventListener('focusout', (e) => {
      emptyInput(e);
      logInFormat(e);
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


form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateLogIn();
});

modalBtn.addEventListener('click', () => {
  modal.classList.add('modal-hidden');
  window.location.href = './';
});
