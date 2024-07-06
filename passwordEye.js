function clickEye(myPasswordBox, myPasswordForm) {
  const passwordBox = document.querySelector(myPasswordBox);
  const passwordInput = document.querySelector(myPasswordForm);
  const eye = passwordBox.querySelector(".eye");
  const slashedEye = passwordBox.querySelector(".slashed.eye");

  eye.addEventListener("click", () => {
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
  slashedEye.addEventListener("click", () => {
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

clickEye(".password.inputBox", ".password.inputForm");
clickEye(".check.password.inputBox", ".check.password.inputForm");