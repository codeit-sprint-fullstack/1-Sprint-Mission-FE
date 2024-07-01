const passwordField = document.getElementById("signup_password");
const togglePassword = document.querySelector(".password-toggle-icon i");

togglePassword.addEventListener("click", function () {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
});

const passwordField_check = document.getElementById("signup_password_check");
const togglePassword_check = document.querySelector(".password-toggle-icon_check i");

togglePassword_check.addEventListener("click", function () {
  if (passwordField_check.type === "password") {
    passwordField_check.type = "text";
    togglePassword_check.classList.remove("fa-eye");
    togglePassword_check.classList.add("fa-eye-slash");
  } else {
    passwordField_check.type = "password";
    togglePassword_check.classList.remove("fa-eye-slash");
    togglePassword_check.classList.add("fa-eye");
  }
});