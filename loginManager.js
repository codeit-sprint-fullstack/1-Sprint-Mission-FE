import USER_DATA from "./USER_DATA.js";

const loginForm = document.querySelector('.login.mainContent');

function userLogin(email, password){
  return USER_DATA.some(user => (user.email === email) && (user.password === password));
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const email = loginForm.getElementById('email');
  const password = loginForm.getElementById('password');

  if(userLogin(email.value, password.value)){
    location.href = '/items';
  } else {
    alert('비밀번호가 일치하지 않습니다.');
  }
});

console.log(USER_DATA);