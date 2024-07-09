export { emailForm, USER_DATA as userData, showDialog, okCLick, pswShow, userEmailBorder, showDialog2 }

const mPassword = document.querySelector('.m_password');
const showPw = document.querySelector('#show_pw');
const userEmail = document.querySelector('#user_email')
const emailMsg1 = document.querySelector("#emailMsg1")
const emailMsg2 = document.querySelector("#emailMsg2")
const alertOverlay = document.querySelector('.alert_overlay');
const page = document.querySelector('.page_background')
const dialog = document.querySelector('dialog')
const dialogInner = document.querySelector('.dialog__inner')
const dialogInnerText = document.querySelector('#dialog__inner_text')

function pswShow() {
  if (mPassword.type === "password") {
    mPassword.type = "text";
    showPw.classList.remove("fa-eye-slash");
    showPw.classList.add("fa-eye");
  } else {
    mPassword.type = "password";
    showPw.classList.remove("fa-eye");
    showPw.classList.add("fa-eye-slash");
  }
};



function emailForm() {
  let emailText = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (userEmail.value === "") {
    emailMsg1.style.display = "block";
    userEmail.style.border = '1px solid #F74747';
    emailMsg2.style.display = 'none';

  } else {
    emailMsg1.style.display = "none";
    userEmail.style.border = 'none';
    if (emailText.test(userEmail.value) == false) {
      emailMsg2.style.display = "block";
      userEmail.style.border = '1px solid #F74747';
    } else {
      emailMsg2.style.display = "none";
      userEmail.style.border = 'none';
    }
  }
};

function userEmailBorder() {
  userEmail.style.border = 'none';
};


const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];


function showDialog(event) {
  alertOverlay.style.display = 'block';
  dialogInnerText.textContent = '비밀번호가 일치하지 않습니다.';
  event.preventDefault();
}
function showDialog2(event) {
  alertOverlay.style.display = 'block';
  dialogInnerText.textContent = '이메일이 일치하지 않습니다.';
  event.preventDefault();
}
function okCLick() {
  alertOverlay.style.display = 'none';
};

