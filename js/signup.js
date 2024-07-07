const mPassword = document.querySelector('.m_password');
const showPw = document.querySelector('#show_pw');
const mPasswordSecond = document.querySelector('.m_password_second');
const showPwSecond = document.querySelector('#show_pw_second');
const userEmail = document.querySelector('#signup_user_email')
const emailMsg1 = document.querySelector("#signup_emailMsg1")
const emailMsg2 = document.querySelector("#signup_emailMsg2")
const userPassword = document.querySelector('#signup_user_password')
const pswdMsg1 = document.querySelector("#signup_pswdMsg1")
const pswdMsg2 = document.querySelector("#signup_pswdMsg2")
const userPassword2 = document.querySelector('#signup_user_password2')
const pswdMsg3 = document.querySelector("#signup_pswdMsg3")
const signupBtn = document.querySelector('#signup_btn');
const userNickname = document.querySelector('#signup_user_nickname');


showPw.addEventListener("click", function () {
  if (mPassword.type === "password") {
    mPassword.type = "text";
    showPw.classList.remove("fa-eye-slash");
    showPw.classList.add("fa-eye");
  } else {
    mPassword.type = "password";
    showPw.classList.remove("fa-eye");
    showPw.classList.add("fa-eye-slash");
  }
});


showPwSecond.addEventListener("click", function () {
  if (mPasswordSecond.type === "password") {
    mPasswordSecond.type = "text";
    showPwSecond.classList.remove("fa-eye-slash");
    showPwSecond.classList.add("fa-eye");
  } else {
    mPasswordSecond.type = "password";
    showPwSecond.classList.remove("fa-eye");
    showPwSecond.classList.add("fa-eye-slash");
  }
});


userEmail.addEventListener("blur", function () {
  let emailText = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
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
});

userEmail.addEventListener("click", function () {
  userEmail.style.border = 'none';
});


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


function 페이지이동() {
  window.location.href = '../login.html'
}

signupBtn.addEventListener("click", function () {
  if (userEmail.value !== "" && userPassword.value !== "" && userPassword2.value !== "" && userNickname.value !== "" && emailMsg1.style.display === "none" && emailMsg2.style.display === "none" && pswdMsg1.style.display === "none" && pswdMsg2.style.display === "none" && pswdMsg3.style.display === "none") {
    for (let i = 0; i < USER_DATA.length; i++) {
      if (userEmail.value === USER_DATA[i].email) {
        alert("사용 중인 이메일입니다.")
        break;
      }
      else {
        페이지이동();
      }
    }
  }
})

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];
