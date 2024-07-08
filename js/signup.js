import { eyeIconToggle } from './modules/eyeIcon.js';
import { form } from './modules/var.js';
// import { USER_DATA } from './modules/userData.js';
import {
  emptyInput,
  resetError,
  buttonStatus,
  signUpFormat,
} from './modules/validation.js';

eyeIconToggle();

//add eventListenr validate input formats

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
