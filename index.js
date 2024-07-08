const visibilityIcon = document.querySelector(".visibility-icon");

const loginForm = document.querySelector('.login-form');
const userEmail = document.querySelector(".email-container");


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


// Function for validation of user's email and password
const showError = (inputTag, msg) => {
  // 입력 tag의 마지막 자식요소가 p 태그라면 error 메시지 존재  
  const isErrorMsg = inputTag.lastElementChild.tagName === 'P';
  // Error 메시지가 존재한다면 메시지 변경
  if (isErrorMsg) {
    inputTag.children[1].classList.remove('email-input');
    inputTag.children[1].classList.add('err-line');
    
    inputTag.lastElementChild.textContent = msg;
  // Error 메시지가 존재하지 않는다면 p tag 생성 후 메시지 추가
  } else {
    inputTag.children[1].classList.remove('email-input');
    inputTag.children[1].classList.add('err-line');

    const errorMsg = document.createElement('p');
    errorMsg.classList.add('err-msg');
    errorMsg.textContent = msg;
    inputTag.append(errorMsg);
  }
}

const hidenError = (inputTag) => {
  inputTag.children[1].classList.remove('err-line');
  inputTag.children[1].classList.add('email-input');
  inputTag.lastElementChild.textContent = ''; 
}


userEmail.children[1].addEventListener('blur', (e)=>{
  const emailValue = e.target.value;
  
  const emailRegEx = /^[A-Za-z0-9-\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  const validEmail = emailRegEx.test(emailValue);

  if (!emailValue) {
    showError(userEmail, '이메일을 입력해주세요.');
  } else if (!validEmail) {
    showError(userEmail, '잘못된 이메일 형식입니다.');
  } else {
    hidenError(userEmail);
  }
});

// Function to prevent submission when press enter key
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
})