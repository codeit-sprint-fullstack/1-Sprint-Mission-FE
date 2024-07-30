//window.onload = function () {};
//onload end

// 인풋 포커스 아웃(입력 없을 시 에러)
const form = document.getElementById('form');
const email = document.getElementById('email');
const btn = document.querySelector('.btn');
const emailBox = document.querySelector('.inputBox.email');
const userBox = document.querySelector('.inputBox.userName');
const passwordBox = document.querySelector('.inputBox.password');
const rePasswordBox = document.querySelector('.inputBox.rePassword');

export function checkEmail(e) {
  const inputText = e.target.value;
  const expression = /^\S+@\S+$/;
  const err = document.querySelector('.err.email');

  if (inputText.length === 0) {
    err.setAttribute('style', 'display: block');
    err.textContent = '이메일을 입력해주세요.';
    e.target.setAttribute('style', 'outline: 1px solid #f74747');
    return;
  }
  if (!expression.test(inputText)) {
    err.setAttribute('style', 'display: block');
    err.textContent = '잘못된 이메일 형식입니다.';
    e.target.setAttribute('style', 'outline: 1px solid #f74747');
    return;
  }
  err.setAttribute('style', 'display: none');
  e.target.removeAttribute('style', 'outline: 1px solid #f74747');
}

export function checkUser(e) {
  const inputText = e.target.value;
  const err = document.querySelector('.err.userName');
  if (inputText.length === 0) {
    err.setAttribute('style', 'display: block');
    e.target.setAttribute('style', 'outline: 1px solid #f74747');
  } else {
    err.setAttribute('style', 'display: none');
    e.target.removeAttribute('style', 'outline: 1px solid #f74747');
  }
}

export function checkPassword(e) {
  const inputText = e.target.value;
  const err = document.querySelector('.err.password');

  if (inputText.length === 0) {
    err.setAttribute('style', 'display: block');
    err.textContent = '비밀번호를 입력해주세요.';
    e.target.setAttribute('style', 'outline: 1px solid #f74747');
    return;
  }
  if (inputText.length < 8) {
    err.setAttribute('style', 'display: block');
    err.textContent = '비밀번호를 8자 이상 입력해주세요.';
    e.target.setAttribute('style', 'outline: 1px solid #f74747');
    return;
  }
  err.setAttribute('style', 'display: none');
  e.target.removeAttribute('style', 'outline: 1px solid #f74747');
}

export function checkRePassword(e) {
  const inputText = e.target.value;
  const err = document.querySelector('.err.rePassword');

  if (inputText.length === 0) {
    err.setAttribute('style', 'display: block');
    err.textContent = '비밀번호를 다시 한 번 입력해주세요.';
    e.target.setAttribute('style', 'outline: 1px solid #f74747');
    return;
  }
  if (inputText.length < 8) {
    err.setAttribute('style', 'display: block');
    err.textContent = '비밀번호를 8자 이상 입력해주세요.';
    e.target.setAttribute('style', 'outline: 1px solid #f74747');
    return;
  }
  err.setAttribute('style', 'display: none');
  e.target.removeAttribute('style', 'outline: 1px solid #f74747');
}

// emailBox.addEventListener('focusout', checkEmail);
// userBox.addEventListener('focusout', checkUser);
// passwordBox.addEventListener('focusout', checkPassword);
// rePasswordBox.addEventListener('focusout', checkRePassword);

// 패스워드입력 눈 이미지 토글(포커스 아웃 눈 이미지 제거 및 눈 클릭 시 text,password 타입전환 기능 구현중)

// const password = document.getElementById('password');
// const eyeToggle = document.querySelector('.eyeToggle');

export function addEye() {
  let eyeNum = 0;
  const pwEye = document.getElementById('passwordEyeSlash');
  if (eyeNum === 0) {
    pwEye.setAttribute('style', 'visibility: visible');
    eyeNum = 1;
  }
}

const rePwEye = document.getElementById('rePasswordEyeSlash');

export function addReEye() {
  let ReEyeNum = 0;
  const rePwEye = document.getElementById('rePasswordEyeSlash');
  if (ReEyeNum === 0) {
    rePwEye.setAttribute('style', 'visibility: visible');
    ReEyeNum = 1;
  }
}

// passwordBox.addEventListener('focusin', addEye);
// rePasswordBox.addEventListener('focusin', addReEye);

//회원가입 데이터 참조
export const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

export function checkData() {
  const email = document.getElementById('email');
  const modal = document.querySelector('.modal');
  const modalBox = document.querySelector('.modalBox');
  const emailData = USER_DATA.find((data) => {
    return data.email == email.value;
  });
  if (emailData) {
    modalBox.setAttribute('style', 'display:block');
    modal.setAttribute('style', 'display:block');
    return false;
  }
  addCompleteModal();

  // form.action = '/pages/login.html';
  // form.submit();
}
// btn.addEventListener('click', checkData);

//로그인 데이터 참조

export function checkLogin() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const modal = document.querySelector('.modal');
  const modalBox = document.querySelector('.modalBox');
  const emailData = USER_DATA.find((data) => {
    return data.email == email.value;
  });
  const passwordData = USER_DATA.find((data) => {
    return data.password == password.value;
  });
  if (emailData && passwordData) {
    window.location.assign('/pages/items.html');
    // form.action = '/items';
    // form.submit();
  }
  modalBox.setAttribute('style', 'display:block');
  modal.setAttribute('style', 'display:block');
  return false;
}

//회원가입 버튼 활성화/비활성화

export function btnAbled() {
  const btn = document.querySelector('.btn');
  const email = document.getElementById('email');
  const userName = document.getElementById('userName');
  const password = document.getElementById('password');
  const rePassword = document.getElementById('rePassword');
  const expression = /^\S+@\S+$/;

  if (
    expression.test(email.value) &&
    userName.value.length > 0 &&
    password.value.length > 8 &&
    rePassword.value.length > 8
  ) {
    btn.removeAttribute('disabled');
    btn.setAttribute('style', 'background-color: #3692ff');
  } else {
    btn.setAttribute('disabled', 'disabled');
    btn.removeAttribute('style');
  }
}

// form.addEventListener('input', btnAbled);

// 로그인 버튼 활성화
export function LoginBtnAbled() {
  const btn = document.querySelector('.btn');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const expression = /^\S+@\S+$/;

  if (expression.test(email.value) && password.value.length > 8) {
    btn.removeAttribute('disabled');
    btn.setAttribute('style', 'background-color: #3692ff');
  } else {
    btn.setAttribute('disabled', 'disabled');
    btn.removeAttribute('style');
  }
}

//모달

export function addModal() {
  modal.setAttribute('style', 'display:block');
}

export function modalBtnClick() {
  const modal = document.querySelector('.modal');
  const modalBox = document.querySelector('.modalBox');
  modal.setAttribute('style', 'diplay:none');
  modalBox.setAttribute('style', 'diplay:none');
}

export function addCompleteModal() {
  const signupComplete = document.querySelector('.signupComplete');
  const signupCompleteModal = document.querySelector('.signupCompleteModal');
  signupComplete.setAttribute('style', 'display:block');
  signupCompleteModal.setAttribute('style', 'display:block');
}

export function signUpComplete() {
  window.location.assign('/pages/login.html');
}
