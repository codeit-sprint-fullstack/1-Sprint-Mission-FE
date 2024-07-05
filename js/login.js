

const mPassword = document.querySelector('.login_m_password');
const showPw = document.querySelector('#login_show_pw');

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





const userEmail = document.querySelector('#login_user_email')
const emailMsg1 = document.querySelector("#login_emailMsg1")
const emailMsg2 = document.querySelector("#login_emailMsg2")


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

const userPassword = document.querySelector('#login_user_password')
const pswdMsg1 = document.querySelector("#login_pswdMsg1")
const pswdMsg2 = document.querySelector("#login_pswdMsg2")


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
