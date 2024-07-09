import { validateEmail, validatePassword, showError, hideError } from "./validate.js";

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

const handleEmailValidation = (e) => {
  const emailValue = e.target.value;
  if (!emailValue) {
    showError(userEmailContainer, '이메일을 입력해주세요.');
  } else if (!validateEmail(emailValue)) {
    showError(userEmailContainer, '잘못된 이메일 형식입니다.')
  } else {
    hideError(userEmailContainer);
  }
  checkLoginButtonStatus();
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
  checkLoginButtonStatus();
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  if (!loginButton.disabled) {
    window.location.href = './items.html';
  }
}


loginForm.addEventListener('submit', handleFormSubmit);
visibilityIcon.addEventListener('click', passwordVisibility);
userEmailContainer.children[1].addEventListener('blur', handleEmailValidation);
userPasswordContainer.children[1].addEventListener('blur', handlePasswordValidation);
userEmailContainer.children[1].addEventListener('change', checkLoginButtonStatus);
userPasswordContainer.children[1].addEventListener('change', checkLoginButtonStatus);