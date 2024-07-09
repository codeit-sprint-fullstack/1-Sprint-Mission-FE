import USER_DATA from "../USER_DATA.js";

const loginForm = document.querySelector('.login.mainContent');

const modal = document.querySelector(".modal");

function userLogin(email, password){
  return USER_DATA.some(user => (user.email === email) && (user.password === password));
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');

  if(userLogin(email.value, password.value)){
    location.href = '/items';
  } else {
    const modalContent = modal.querySelector('.modalContent');
    modalContent.textContent ='비밀번호가 일치하지 않습니다.';
    modal.showModal();
  }
});