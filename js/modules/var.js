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
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

export { form, emailInput, pwInput, emailField, USER_DATA };
