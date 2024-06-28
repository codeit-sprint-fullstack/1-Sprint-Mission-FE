function clickEye(passwordInput, eye, slashedEye) {
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
}

const passwordBox = document.querySelector(".password.inputBox");
const passwordInput = document.querySelector(".password.inputForm");
const eye = passwordBox.querySelector(".eye");
const slashedEye = passwordBox.querySelector(".slashed.eye");

clickEye(passwordInput, eye, slashedEye);

const passwordBox2 = document.querySelector(".check.password.inputBox");
const passwordInput2 = document.querySelector(".check.password.inputForm");
const eye2 = passwordBox2.querySelector(".eye");
const slashedEye2 = passwordBox2.querySelector(".slashed.eye");

clickEye(passwordInput2, eye2, slashedEye2);