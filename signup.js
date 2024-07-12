import {validateEmail, validatePassword, showError, hideError} from "./modules/validate.js";
import { USER_DATA } from "./modules/userData.js";
import { createAlertBox } from "./modules/alert.js";

const visibilityIcon = document.querySelectorAll(".visibility-icon");

const signupForm = document.querySelector(".signup-container");
const userEmailContainer = document.querySelector(".email-container");
const userPasswordContainer = document.querySelector(".password-container");
const userPasswordRepeatContainer = document.querySelector(".password-repeat-container");
const signupButton = document.querySelector("#button");

// Function for password visualization
const passwordVisibility = (e) => {
  const passwordInput = e.target.previousElementSibling;
  const isTextType = passwordInput.type === "text";
  passwordInput.type = isTextType ? "password" : "text";
  e.target.src = isTextType ? "./imgs/btn_visibility_off.png" : "./imgs/btn_visibility_on.png";
  e.target.width = 24;
  e.target.height = 24;
}

// Function to check ID availability when signing up for membership
const checkSignup = (email) => {
  const user = USER_DATA.find(user => user.email === email);

  if (user) {
    return 'alreadyExisted';
  } else {
    return 'success';
  }
}


// Function to check if the signup button should be enabled or disabled
const checktSignupButtonStatus = () => {
  const emailValue = userEmailContainer.children[1].value;
  const passwordValue = userPasswordContainer.children[1].value;
  const passwordRepeatValue = userPasswordRepeatContainer.children[1].value;

  const emailErrorMsg = userEmailContainer.querySelector(".err-msg");
  const passwordErrorMsg = userPasswordContainer.querySelector(".err-msg");
  const passwordRepeatErrorMsg = userPasswordRepeatContainer.querySelector(".err.msg");

  if (emailErrorMsg || passwordErrorMsg || passwordRepeatErrorMsg) {
    signupButton.disabled = true;
    signupButton.classList.remove('enabled');
  } else if ((validateEmail(emailValue) && 
    validatePassword(passwordValue) && 
    validatePassword(passwordRepeatValue)) && (passwordValue === passwordRepeatValue)) 
    {
      signupButton.disabled = false;
      signupButton.classList.add('enabled');
  }
}

const handleEmailValidation = (e) => {
  const emailValue = e.target.value;
  if (!emailValue) {
    showError(userEmailContainer, '이메일을 입력해주세요.');
  } else if (!validateEmail(emailValue)) {
    showError(userEmailContainer, '잘못된 이메일 형식입니다.');
  } else {
    hideError(userEmailContainer);
  }
  checktSignupButtonStatus();
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
  checktSignupButtonStatus();
}


const handlePasswordRepeatValidation = (e) => {
  const passwordRepeatValue = e.target.value; 
  const passwordValue = userPasswordContainer.children[1].value;
  const isPasswordMatch = passwordRepeatValue === passwordValue

  if (!isPasswordMatch) {
    showError(userPasswordRepeatContainer, '비밀번호가 일치하지 않습니다.');
  } else {
    hideError(userPasswordRepeatContainer);
  }
  checktSignupButtonStatus();
}


const handleFormSubmit = (e) => {
  e.preventDefault();

  const emailValue = userEmailContainer.children[1].value;

  const signupResult = checkSignup(emailValue);

  if (!signupButton.disabled && signupResult === 'success') {
    window.location.href = './login.html';
  } else {
    createAlertBox('사용 중인 이메일입니다.');
  }
}

signupForm.addEventListener('submit', handleFormSubmit);
visibilityIcon.forEach(icon => {icon.addEventListener("click", passwordVisibility)});
userEmailContainer.children[1].addEventListener('blur', handleEmailValidation);
userPasswordContainer.children[1].addEventListener('blur', handlePasswordValidation);
userPasswordRepeatContainer.children[1].addEventListener('blur', handlePasswordRepeatValidation);
userEmailContainer.children[1].addEventListener('change', checktSignupButtonStatus);
userPasswordContainer.children[1].addEventListener('change', checktSignupButtonStatus);
userPasswordRepeatContainer.children[1].addEventListener('change', checktSignupButtonStatus);


