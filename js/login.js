

const mPassword = document.querySelector('.login_m_password');
const showPw = document.querySelector('#login_show_pw');
const userEmail = document.querySelector('#login_user_email')
const emailMsg1 = document.querySelector("#login_emailMsg1")
const emailMsg2 = document.querySelector("#login_emailMsg2")
const userPassword = document.querySelector('#login_user_password')
const pswdMsg1 = document.querySelector("#login_pswdMsg1")
const pswdMsg2 = document.querySelector("#login_pswdMsg2")
const loginBtn = document.querySelector('#login_btn');



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
  }
});

userPassword.addEventListener("click", function () {
  userPassword.style.border = 'none';
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
  for (let i = 0; i < USER_DATA.length; i++) {
    if (userEmail.value === USER_DATA[i].email && userPassword.value === USER_DATA[i].password) {
      페이지이동();
      break;
    }
    else {
      if (i === USER_DATA.length - 1) {
        alert("비밀번호가 틀렸습니다.")
        break;
      }
    }
  }
}
)

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];
