import USER_DATA from "./USER_DATA";

const loginForm = document.querySelector('form.login');

function userLogin(email, password){
  return USER_DATA.some(user => (user.email === email) && (user.password === password));
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');

  if(userLogin(email.value, password.value)){
    alert('로그인 성공');
  } else {
    alert('비밀번호가 일치하지 않습니다.');
  }
});

console.log(USER_DATA);