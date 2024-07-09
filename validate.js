// Functions for validating user login information
export const validateEmail = (email) => {
  const emailRegEx = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return emailRegEx.test(email);
}

export const validatePassword = (password) => {
  return password.length >= 8;
}

// Functions for validation of user's email and password
export const showError = (inputTag, msg) => {
  const isErrorMsg = inputTag.lastElementChild.tagName === 'P';
  inputTag.children[1].classList.remove('input');
  inputTag.children[1].classList.add('err-line');

  if (isErrorMsg) {
    inputTag.lastElementChild.textContent = msg;
  } else {
    const errorMsg = document.createElement('p');
    errorMsg.classList.add('err-msg');
    errorMsg.textContent = msg;
    inputTag.append(errorMsg);
  }
}

export const hideError = (inputTag) => {
  inputTag.children[1].classList.remove('err-line');
  inputTag.children[1].classList.add('input');
  const errorMsg = inputTag.querySelector('.err-msg');
  if (errorMsg) {
    errorMsg.remove();
  }
}