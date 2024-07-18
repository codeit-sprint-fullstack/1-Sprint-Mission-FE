import { userData, emailForm, showDialog, okCLick, pswShow, pwShowSecond, userEmailBorder } from './login_signup.js';

const showPw = document.querySelector('#show_pw');
const showPwSecond = document.querySelector('#show_pw_second');
const userEmail = document.querySelector('#user_email')
const emailMsg1 = document.querySelector("#emailMsg1")
const emailMsg2 = document.querySelector("#emailMsg2")
const userPassword = document.querySelector('#user_password')
const pswdMsg1 = document.querySelector("#pswdMsg1")
const pswdMsg2 = document.querySelector("#pswdMsg2")
const userPassword2 = document.querySelector('#user_password2')
const pswdMsg3 = document.querySelector("#pswdMsg3")
const signupBtn = document.querySelector('#signup_btn');
const userNickname = document.querySelector('#user_nickname');
const ok = document.querySelector("#ok")


showPw.addEventListener("click", pswShow)

showPwSecond.addEventListener("click", pwShowSecond);

userEmail.addEventListener("blur", emailForm);

userEmail.addEventListener("click", userEmailBorder);

ok.addEventListener("click", okCLick);

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
    if (userPassword2.value === "") {
      pswdMsg3.style.display = "none";
      userPassword2.style.border = 'none';
    }
    else if (userPassword.value !== userPassword2.value) {
      pswdMsg3.style.display = "block";
      userPassword2.style.border = '1px solid #F74747';
    } else {
      pswdMsg3.style.display = "none";
      userPassword2.style.border = 'none';
    }
  }
});

userPassword.addEventListener("click", function () {
  userPassword.style.border = 'none';
});

userPassword2.addEventListener("blur", function () {
  if (userPassword.value !== userPassword2.value) {
    pswdMsg3.style.display = "block";
    userPassword2.style.border = '1px solid #F74747';
  } else {
    pswdMsg3.style.display = "none";
    userPassword2.style.border = 'none';
  }
});
userPassword2.addEventListener("click", function () {
  userPassword2.style.border = 'none';
});

function loginPage() {
  window.location.href = './login.html'
}

signupBtn.addEventListener("click", function (event) {
  if (userEmail.value !== "" && userPassword.value !== "" && userPassword2.value !== "" && userNickname.value !== "" && emailMsg1.style.display === "none" && emailMsg2.style.display === "none" && pswdMsg1.style.display === "none" && pswdMsg2.style.display === "none" && pswdMsg3.style.display === "none") {
    for (let i = 0; i < userData.length; i++) {
      if (userEmail.value === userData[i].email) {
        showDialog(event)
        break;
      } else {
        if (i === userData.length - 1) {
          loginPage()
          break;
        }

      }
    }
  }
})




