import {validateEmail, validatePassword, showError, hideError} from "./modules/validate.js";

const visibilityIcon = document.querySelectorAll(".visibility_icon");

const signupForm = document.querySelector(".signup_container");
const userEmailContainer = document.querySelector(".email_container");
const userPasswordContainer = document.querySelector(".password_container");
const userPasswordRepeatContainer = document.querySelector(".password_repeat_container");
const signupButton = document.querySelector("#button");


const passwordVisibility = (e) => {
  const passwordInput = e.target.previousElementSibling;
  const isTextType = passwordInput.type === "text";
  passwordInput.type = isTextType ? "password" : "text";
  e.target.src = isTextType ? "./imgs/btn_visibility_off.png" : "./imgs/btn_visibility_on.png";
  e.target.width = 24;
  e.target.height = 24;
}

const checktSignupButtonStatus = () => {
  const emailValue = userEmailContainer.children[1].value;
  const passwordValue = userPasswordContainer.children[1].value;
  const passwordRepeatValue = userPasswordRepeatContainer.children[1].value;

  const emailErrorMsg = userEmailContainer.querySelector(".err_msg");
  const passwordErrorMsg = userPasswordContainer.querySelector(".err_msg");
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
  if (!signupButton.disabled) {
    window.location.href = './login.html';
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


