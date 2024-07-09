import { emailForm, userData, showDialog, okCLick, userEmailBorder, pswShow, showDialog2 } from './login_signup.js';

const showPw = document.querySelector('#show_pw');
const userEmail = document.querySelector('#user_email')
const emailMsg1 = document.querySelector("#emailMsg1")
const emailMsg2 = document.querySelector("#emailMsg2")
const userPassword = document.querySelector('#user_password')
const pswdMsg1 = document.querySelector("#pswdMsg1")
const pswdMsg2 = document.querySelector("#pswdMsg2")
const loginBtn = document.querySelector('#login_btn');
const ok = document.querySelector("#ok")


showPw.addEventListener("click", pswShow)


userEmail.addEventListener("blur", emailForm);

userEmail.addEventListener("click", userEmailBorder);

userPassword.addEventListener("blur", function () {
  if (userPassword.value === "") {
    pswdMsg1.style.display = "block";
    userPassword.style.border = '1px solid #F74747';
    pswdMsg2.style.display = "none";
  } else {
    pswdMsg1.style.display = "none";
    userPassword.style.border = 'none';
    if (userPassword.value.length < 8) {
      pswdMsg2.style.display = "block";
      userPassword.style.border = '1px solid #F74747';
    } else {
      pswdMsg2.style.display = "none";
      userPassword.style.border = 'none';
    }
  }
});

loginBtn.addEventListener("mouseover", function () {
  if (!(userEmail.value && userPassword.value && emailMsg1.style.display === 'none' && emailMsg2.style.display === 'none' && pswdMsg1.style.display === 'none' && pswdMsg2.style.display === 'none')) {
    loginBtn.disabled = true;
  } else {
    loginBtn.disabled = false;
    loginBtn.style.cursor = "pointer"
  }
});

function 페이지이동() {
  window.location.href = './item.html'
}

loginBtn.addEventListener("click", function () {
  for (let i = 0; i < userData.length; i++) {
    if (userEmail.value === userData[i].email) {
      if (userPassword.value === userData[i].password) {
        페이지이동();
        break;
      } else {
        showDialog();
        break;
      }
    }
    else {
      if (i === userData.length - 1) {
        // diallogOpen();
        showDialog2();
        break;
      }
    }
  }
}
)

ok.addEventListener("click", okCLick);

// const dialog = document.querySelector('dialog');


// function diallogOpen() {
//   dialog.showModal();
//   showDialog()
// }

// const dialog = document.querySelector('dialog');

// const openButton = document.querySelector('button.open')

// openButton.addEventListener('click', () => {
//   dialog.showModal();
// })

// const closeButton = document.querySelector('button.close')

// closeButton.addEventListener('click', () => {
//   dialog.close();
// })

