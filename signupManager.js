import USER_DATA from "./USER_DATA.js";

const signupForm = document.querySelector('.signup.mainContent');

const modal = document.querySelector(".modal");

function userSignup(email){
  return USER_DATA.some(user => (user.email === email));
}

signupForm.addEventListener('submit', event => {
  event.preventDefault();

  const email = document.getElementById('email');

  if(userSignup(email.value)){
    // alert('사용 중인 이메일입니다');
    modal.showModal();
  } else {
    location.href = '/login';
  }
});