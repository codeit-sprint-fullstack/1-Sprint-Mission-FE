

const mPassword = document.querySelector('.mPassword');
const showPw = document.querySelector('#show_pw');

showPw.addEventListener("click", function () {
  if (mPassword.type === "password") {
    mPassword.type = "text";
    showPw.classList.remove("fa-eye-slash");
    showPw.classList.add("fa-eye");
  } else {
    mPassword.type = "password";
    showPw.classList.remove("fa-eye");
    showPw.classList.add("fa-eye-slash");
  }
});



const mPasswordSecond = document.querySelector('.mPasswordSecond');
const showPwSecond = document.querySelector('#showPwSecond');

showPwSecond.addEventListener("click", function () {
  if (mPasswordSecond.type === "password") {
    mPasswordSecond.type = "text";
    showPwSecond.classList.remove("fa-eye-slash");
    showPwSecond.classList.add("fa-eye");
  } else {
    mPasswordSecond.type = "password";
    showPwSecond.classList.remove("fa-eye");
    showPwSecond.classList.add("fa-eye-slash");
  }
});



