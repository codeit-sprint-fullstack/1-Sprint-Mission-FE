const eyeCloseIcon = document.querySelector("#eye-close-icon");
const eyeShowIcon = document.querySelector('#eye-show-icon');

const emailInput = document.querySelector('#email-input');
const emailError = document.querySelector('#email-error');
const passwordInput = document.querySelector('#password-input');
const passwordError = document.querySelector('#password-error');
const useBtn = document.querySelector('#button');

const loginErrorDlg = document.querySelector('#password-error-dlg');
const dlgBtn = document.querySelector('#dialog-button');
const errorMsg = document.querySelector('#error-message');

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 멘토님의 코멘트를 받고 eye-show-icon을 추가하면서 배운 js를 활용해서 
// 비밀번호를 입력해야만 eye icon이 뜨게 끔 설정했습니다.

// 비밀번호 입력시 eye-show-icon 보여주기
function eyeIconShow() {
  if(passwordInput.value !== '') {
    eyeShowIcon.classList.add('show');
  } else {
    eyeShowIcon.classList.remove('show');
  }
}


// 클릭시 비밀번호 type 전환 (text <-> password)
function eyeIconUse() {
  if(passwordInput.type == "password"){
    passwordInput.type = "text";
    eyeShowIcon.classList.remove('show');
    eyeCloseIcon.classList.add('show');
  } else {
    passwordInput.type = "password";
    eyeCloseIcon.classList.remove('show');
    eyeShowIcon.classList.add('show');
  }
}

// "이메일을 입력해주세요." / "잘못된 이메일 형식입니다." 에러 메시지 표시
function validateEmail() {
  if (emailInput.value === '') {
    emailError.classList.add('show');
    emailError.innerHTML = "이메일을 입력해주세요.";
    emailInput.style.outline = '1px solid var(--red)';
  } else if (!emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.classList.add('show');
    emailError.innerHTML = "잘못된 이메일 형식입니다.";
    emailInput.style.outline = '1px solid var(--red)';
  } else {
    emailError.classList.remove('show');
    emailInput.style.outline = '';
  }
}

// "비밀번호를 입력해주세요." / "비밀번호를 8자 이상 입력해주세요." 에러 메시지 표시
function validatePassword() {
  if(passwordInput.value === '') {
    passwordError.classList.add('show');
    passwordError.innerHTML = '비밀번호를 입력해주세요.';
    passwordInput.style.outline = '1px solid var(--red)';
  } else if (passwordInput.value.length < 8) {
    passwordError.classList.add('show'); 
    passwordError.innerHTML = '비밀번호를 8자 이상 입력해주세요.';
    passwordInput.style.outline = '1px solid var(--red)';
  } else{
    passwordError.classList.remove('show');
    passwordInput.style.outline = '';
  }
}

// 조건 만족시 버튼 활성화(로그인)
useBtn.style.cursor = 'default';

function canUseLoginBtn() {
  if (emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && passwordInput.value.length > 7){
    useBtn.disabled = false;
    useBtn.style.backgroundColor = 'var(--blue)';
    useBtn.style.cursor = 'pointer';
  } else {
    useBtn.disabled = true;
    useBtn.style.backgroundColor = '';
    useBtn.style.cursor = 'default';
  }
}
canUseLoginBtn();


// USER_DATA와 입력값 비교 후 로그인 성공 / 실패 
var link = 'items.html';

function loginSuccess() {
  const emailValue = emailInput.value;
  const passwordValue =passwordInput.value;

  const user = USER_DATA.find((el) => emailValue === el.email && passwordValue === el.password);

  if (user) {
    document.location.href = link;
  } else {
    loginErrorDlg.style.display = 'flex';
    errorMsg.innerHTML = '비밀번호가 일치하지 않습니다.';
    loginErrorDlg.showModal();
  }
}

// dialog 확인 버튼 클릭 시, 모달 창 닫기
dlgBtn.addEventListener('click', () => {
  loginErrorDlg.style.display = '';
  loginErrorDlg.close();
})

passwordInput.addEventListener('input', eyeIconShow);
eyeCloseIcon.addEventListener('click', eyeIconUse);
eyeShowIcon.addEventListener('click', eyeIconUse);

emailInput.addEventListener('focusout', validateEmail);
passwordInput.addEventListener('focusout', validatePassword);

emailInput.addEventListener('input', canUseLoginBtn);
passwordInput.addEventListener('input', canUseLoginBtn);

useBtn.addEventListener('click', loginSuccess);