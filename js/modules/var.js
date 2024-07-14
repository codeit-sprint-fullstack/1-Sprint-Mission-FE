//mission 3

const form = document.querySelector('form');
const emailField = form.querySelector('.email-field');
const emailInput = emailField.querySelector('#user-email');
const pwField = form.querySelector('.pw-field');
const cPwField = form.querySelector('.confirm-pw-field');
const pwInput = document.querySelector('#pw');
const confirmPwInput = document.querySelector('#confirm-pw');
const nameField = form.querySelector('.name-field');
const nameInput = document.querySelector('#name');
const submitBtn = form.querySelector('button');
const modal = document.querySelector('#overlay');
const modalMsg = document.querySelector('#modal span');
const modalBtn = modal.querySelector('.modal-button');
export {
  form,
  emailInput,
  pwInput,
  emailField,
  modal,
  modalMsg,
  modalBtn,
  confirmPwInput,
  submitBtn,
};
