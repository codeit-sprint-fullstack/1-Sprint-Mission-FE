const passwordBox = document.querySelector(".password.inputBox");
const passwordInput = document.querySelector(".password.inputForm");
const eye = passwordBox.querySelector(".eye");
const slashedEye = passwordBox.querySelector(".slashed.eye");

eye.addEventListener("click", function() {
  if(passwordInput.type === "password") {
    passwordInput.type = "text";
    eye.style.display = "none"
    slashedEye.style.display = "block"
  } else {
    passwordInput.type = "password";
    eye.style.display = "block"
    slashedEye.style.display = "none"
  }
});
slashedEye.addEventListener("click", function() {
  if(passwordInput.type === "password") {
    passwordInput.type = "text";
    eye.style.display = "none"
    slashedEye.style.display = "block"
  } else {
    passwordInput.type = "password";
    eye.style.display = "block"
    slashedEye.style.display = "none"
  }
});

const passwordBox2 = document.querySelector(".check.password.inputBox");
const passwordInput2 = document.querySelector(".check.password.inputForm");
const eye2 = passwordBox2.querySelector(".eye");
const slashedEye2 = passwordBox2.querySelector(".slashed.eye");

eye2.addEventListener("click", function() {
  if(passwordInput2.type === "password") {
    passwordInput2.type = "text";
    eye2.style.display = "none"
    slashedEye2.style.display = "block"
  } else {
    passwordInput2.type = "password";
    eye2.style.display = "block"
    slashedEye2.style.display = "none"
  }
});
slashedEye2.addEventListener("click", function() {
  if(passwordInput2.type === "password") {
    passwordInput2.type = "text";
    eye2.style.display = "none"
    slashedEye2.style.display = "block"
  } else {
    passwordInput2.type = "password";
    eye2.style.display = "block"
    slashedEye2.style.display = "none"
  }
});