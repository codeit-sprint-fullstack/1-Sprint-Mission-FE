const visibilityIcon = document.querySelector(".visibility_icon");
const userEmailInput = document.querySelector("")

// Function for password visualization
const passwordVisibility = (e) => {
  const passwordInput = e.target.previousElementSibling;
  const passwordType = passwordInput.type === "text";
  passwordInput.type = passwordType ? "password" : "text";
  e.target.src = passwordType ? "./imgs/btn_visibility_off.png" : "./imgs/btn_visibility_on.png";
  e.target.width = 24;
  e.target.height = 24;
}

visibilityIcon.addEventListener('click', passwordVisibility);

