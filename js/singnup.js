

const m_password = document.querySelector('.m_password');
const show_pw = document.querySelector('#show_pw');

show_pw.addEventListener("click", function () {
  if (m_password.type === "password") {
    m_password.type = "text";
    show_pw.classList.remove("fa-eye-slash");
    show_pw.classList.add("fa-eye");
  } else {
    m_password.type = "password";
    show_pw.classList.remove("fa-eye");
    show_pw.classList.add("fa-eye-slash");
  }
});



const m_password_second = document.querySelector('.m_password_second');
const show_pw_second = document.querySelector('#show_pw_second');

show_pw_second.addEventListener("click", function () {
  if (m_password_second.type === "password") {
    m_password_second.type = "text";
    show_pw_second.classList.remove("fa-eye-slash");
    show_pw_second.classList.add("fa-eye");
  } else {
    m_password_second.type = "password";
    show_pw_second.classList.remove("fa-eye");
    show_pw_second.classList.add("fa-eye-slash");
  }
});



