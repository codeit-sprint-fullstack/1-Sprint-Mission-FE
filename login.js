const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const emailInput = document.getElementById('email');
const emailError = document.querySelector('.email-error-message');
const passwordInput = document.getElementById('password');
const passwordError = document.querySelector('.password-error-message');
const loginButton = document.querySelector('.login-button');
const loginForm = document.querySelector('.login-form');
const bg = document.querySelector('.bg');
const modalButton = document.querySelector('.modal-button');

function isValidEmail(email) {
  const at = email.indexOf('@');
  if (at < 1) {
    return false;
  }

  const dot = email.indexOf('.', at);
  if (dot <= at + 1) {
    return false;
  }

  if (dot === email.length - 1) {
    return false;
  }

  return true;
}

function updateButtonState() {
  const isEmailValid = emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim());
  const isPasswordValid = passwordInput.value.trim() !== '' && passwordInput.value.trim().length >= 8;

  loginButton.disabled = !(isEmailValid && isPasswordValid);
  loginButton.classList.toggle('disabled', loginButton.disabled);
}

function validateEmail() {
  if (emailInput.value.trim() === '') {
    emailInput.classList.add('error');
    emailError.style.display = 'block';
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailInput.classList.add('error');
    emailError.style.display = 'block';
  } else {
    emailInput.classList.remove('error');
    emailError.style.display = 'none';
  }
  updateButtonState();
}

function validatePassword() {
  if (passwordInput.value.trim() === '') {
    passwordInput.classList.add('error');
    passwordError.style.display = 'block';
  } else if (passwordInput.value.trim().length < 8) {
    passwordInput.classList.add('error');
    passwordError.style.display = 'block';
  } else {
    passwordInput.classList.remove('error');
    passwordError.style.display = 'none';
  }
  updateButtonState();
}

emailInput.addEventListener('focusout', validateEmail);
passwordInput.addEventListener('focusout', validatePassword);
modalButton.addEventListener('click', function() {
  bg.style.display = 'none';
});

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const user = USER_DATA.find(user => user.email === email);
  if (user) {
    if (user.password === password) {
      window.location.href = '/items.html';
    } else {
      bg.style.display = 'block';
    }
  } else {
    bg.style.display = 'block';
  }
});

updateButtonState();
