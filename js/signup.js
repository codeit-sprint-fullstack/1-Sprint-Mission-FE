import { eyeIconToggle } from './modules/eyeIcon.js';
import { form } from './modules/var.js';
import { USER_DATA } from './modules/userData.js';
import {
  emptyInput,
  resetError,
  validateFormat,
  formValidity,
  buttonStatus,
  submitBtn,
  validateLogin,
} from './modules/validation.js';

eyeIconToggle();

//add eventListenr validate input formats

form.querySelectorAll('input').forEach((input) => {
  if (input) {
    input.addEventListener('blur', (e) => {
      emptyInput(e);
      validateFormat(e);
      buttonStatus();
    });
    input.addEventListener('focusin', () => {
      resetError(input);
    });
    input.addEventListener('input', () => {
      resetError(input);
      buttonStatus();
    });
  }
});

buttonStatus();
