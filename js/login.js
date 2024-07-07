import { eyeIconToggle } from './modules/eyeIcon.js';
import { form } from './modules/var.js';

import {
  emptyInput,
  resetError,
  validateFormat,
  formValidity,
  buttonStatus,
  submitBtn,
} from './modules/validation.js';

eyeIconToggle();

//add eventListenr validate input formats

form.querySelectorAll('input').forEach((input) => {
  if (input) {
    input.addEventListener('focusout', (e) => {
      emptyInput(e);
      validateFormat(e);
      buttonStatus();
    });
    input.addEventListener('focus', () => {
      resetError(input);
    });
    input.addEventListener('input', () => {
      resetError(input);
      validateFormat(e);
      buttonStatus();
    });
  }
});
