export {
  USER_DATA as userData,
  emailForm,
  pswShow,
  pwShowSecond,
  pswEmg,
  showPasswordDialog,
  okCLick,
  userEmailBorder,
  showEmailDialog,
  showEmailCheckDialog,
};

const mPassword = document.querySelector('.m_password');
const mPasswordSecond = document.querySelector('.m_password_second');
const showPw = document.querySelector('#show_pw');
const showPwSecond = document.querySelector('#show_pw_second');
const userPassword = document.querySelector('#user_password');
const pswdMsg1 = document.querySelector('#pswdMsg1');
const pswdMsg2 = document.querySelector('#pswdMsg2');
const userEmail = document.querySelector('#user_email');
const emailMsg1 = document.querySelector('#emailMsg1');
const emailMsg2 = document.querySelector('#emailMsg2');
const alertOverlay = document.querySelector('.alert_overlay');
const dialogInnerText = document.querySelector('#dialog__inner_text');

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

function emailForm() {
  let emailText =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (userEmail.value === '') {
    emailMsg1.style.display = 'block';
    userEmail.style.border = '1px solid #F74747';
    emailMsg2.style.display = 'none';
  } else {
    emailMsg1.style.display = 'none';
    userEmail.style.border = 'none';
    if (emailText.test(userEmail.value) == false) {
      emailMsg2.style.display = 'block';
      userEmail.style.border = '1px solid #F74747';
    } else {
      emailMsg2.style.display = 'none';
      userEmail.style.border = 'none';
    }
  }
}

function pswShow() {
  if (mPassword.type === 'password') {
    mPassword.type = 'text';
    showPw.classList.remove('fa-eye-slash');
    showPw.classList.add('fa-eye');
  } else {
    mPassword.type = 'password';
    showPw.classList.remove('fa-eye');
    showPw.classList.add('fa-eye-slash');
  }
}

function pwShowSecond() {
  if (mPasswordSecond.type === 'password') {
    mPasswordSecond.type = 'text';
    showPwSecond.classList.remove('fa-eye-slash');
    showPwSecond.classList.add('fa-eye');
  } else {
    mPasswordSecond.type = 'password';
    showPwSecond.classList.remove('fa-eye');
    showPwSecond.classList.add('fa-eye-slash');
  }
}

function pswEmg() {
  if (userPassword.value === '') {
    pswdMsg1.style.display = 'block';
    userPassword.style.border = '1px solid #F74747';
    pswdMsg2.style.display = 'none';
  } else {
    pswdMsg1.style.display = 'none';
    userPassword.style.border = 'none';
    if (userPassword.value.length < 8) {
      pswdMsg2.style.display = 'block';
      userPassword.style.border = '1px solid #F74747';
    } else {
      pswdMsg2.style.display = 'none';
      userPassword.style.border = 'none';
    }
  }
}

function userEmailBorder() {
  userEmail.style.border = 'none';
}

function showPasswordDialog(event) {
  alertOverlay.style.display = 'block';
  dialogInnerText.textContent = '비밀번호가 일치하지 않습니다.';
  event.preventDefault();
}
function showEmailDialog(event) {
  alertOverlay.style.display = 'block';
  dialogInnerText.textContent = '이메일이 일치하지 않습니다.';
  event.preventDefault();
}

function showEmailCheckDialog(event) {
  alertOverlay.style.display = 'block';
}
function okCLick() {
  alertOverlay.style.display = 'none';
}
