import { eyeIconToggle } from './modules/eyeIcon.js';
import { form } from './modules/var.js';
// import { USER_DATA } from './modules/userData.js';
import {
  emptyInput,
  resetError,
  logInFormat,
  buttonStatus,
  validateLogIn,
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
  } else {
    console.log('no input');
  }
});

buttonStatus();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateLogIn();
});

const modal = document.querySelector('#overlay');
const modalBtn = modal.querySelector('.modal-button');

modalBtn.addEventListener('click', () => {
  modal.classList.add('modal-hidden');
  window.location.href = './';
});
