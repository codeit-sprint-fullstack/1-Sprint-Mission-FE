const visibilityIcon = document.querySelector(".visibility-icon");

const loginForm = document.querySelector('.login-form');
const userEmailContainer = document.querySelector(".email-container");
const userPasswordContainer = document.querySelector(".password-container");

const loginButton = document.querySelector("#button");

// Function for password visualization
const passwordVisibility = (e) => {
  const passwordInput = e.target.previousElementSibling;
  const passwordType = passwordInput.type === "text";
  passwordInput.type = passwordType ? "password" : "text";
  e.target.src = passwordType ? "./imgs/btn_visibility_off.png" : "./imgs/btn_visibility_on.png";
  e.target.width = 24;
  e.target.height = 24;
}

// Functions for validating user login information
const validateEmail = (email) => {
  const emailRegEx = /^[A-Za-z0-9-\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return emailRegEx.test(email);
}

const validatePassword = (password) => {
  return password.length >= 8;
}


// Function to check if the login button should be enabled or disabled
const checkLoginButtonStatus = () => {
  const emailValue = userEmailContainer.children[1].value;
  const passwordValue = userPasswordContainer.children[1].value;

  const emailErrorMsg = userEmailContainer.querySelector(".err-msg");
  const passwordErrorMsg = userPasswordContainer.querySelector(".err-msg");

  if (emailErrorMsg || passwordErrorMsg) {
    loginButton.disabled = true;
    loginButton.classList.remove('enabled')
  } else if (validateEmail(emailValue) && validatePassword(passwordValue)) {
    loginButton.disabled = false;
    loginButton.classList.add('enabled');
  }
}

// Functions for validation of user's email and password
const showError = (inputTag, msg) => {
  const isErrorMsg = inputTag.lastElementChild.tagName === 'P';
  inputTag.children[1].classList.remove('input');
  inputTag.children[1].classList.add('err-line');

  if (isErrorMsg) {
    inputTag.lastElementChild.textContent = msg;
  } else {
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('err-msg');
    errorMsg.textContent = msg;
    inputTag.append(errorMsg);
  }
  checkLoginButtonStatus();
}

const hideError = (inputTag) => {
  inputTag.children[1].classList.remove('err-line');
  inputTag.children[1].classList.add('input');
  const errorMsg = inputTag.querySelector('.err-msg');
  if (errorMsg) {
    errorMsg.remove();
  }
  checkLoginButtonStatus();
}


const handleEmailValidation = (e) => {
  const emailValue = e.target.value;
  if (!emailValue) {
    showError(userEmailContainer, '이메일을 입력해주세요.');
  } else if (!validateEmail(emailValue)) {
    showError(userEmailContainer, '잘못된 이메일 형식입니다.')
  } else {
    hideError(userEmailContainer);
  }
}

const handlePasswordValidation = (e) => {
  const passwordValue = e.target.value;
  if (!passwordValue) {
    showError(userPasswordContainer, '비밀번호를 입력해주세요.');
  } else if (!validatePassword(passwordValue)) {
    showError(userPasswordContainer, '비밀번호를 8자 이상 입력해주세요.'); 
  } else {
    hideError(userPasswordContainer);
  }
}

const handleFormSubmit = (e) => {
  e.preventDefault();
}


loginForm.addEventListener('submit', handleFormSubmit);
visibilityIcon.addEventListener('click', passwordVisibility);
userEmailContainer.children[1].addEventListener('blur', handleEmailValidation);
userPasswordContainer.children[1].addEventListener('blur', handlePasswordValidation);
userEmailContainer.children[1].addEventListener('change', checkLoginButtonStatus);
userPasswordContainer.children[1].addEventListener('change', checkLoginButtonStatus);