export function clickEye(myPasswordBox, myPasswordForm) {
  const passwordBox = document.querySelector(myPasswordBox);
  const passwordInput = document.querySelector(myPasswordForm);
  const eye = passwordBox.querySelector(".eye");
  const slashedEye = passwordBox.querySelector(".slashed.eye");

  function toggleEye() {
    if(passwordInput.type === "password") {
      passwordInput.type = "text";
      eye.style.display = "none"
      slashedEye.style.display = "block"
    } else {
      passwordInput.type = "password";
      eye.style.display = "block"
      slashedEye.style.display = "none"
    }
  };

  eye.addEventListener("click", toggleEye);
  slashedEye.addEventListener("click", toggleEye);
}