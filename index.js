const password = document.getElementById('password');
const passIcon = document.getElementById('pass_icon');

passIcon.addEventListener('click', showHide);

function showHide () {
  if (password.type === 'password') {
    password.setAttribute('type','text');
    passIcon.setAttribute('src', 'img/eyeopen.png')
 } else {
    password.setAttribute('type', 'password');
    passIcon.setAttribute('src', 'img/eyeclose.png')
 }
}

const checkIcon = document.getElementById('check_icon')
const passwordCheck = document.getElementById('password_check')

checkIcon.addEventListener('click', showHide2)

function showHide2 () {
  if (passwordCheck.type === 'password') {
    passwordCheck.setAttribute('type','text');
    checkIcon.setAttribute('src', 'img/eyeopen.png')
 } else {
    passwordCheck.setAttribute('type', 'password');
    checkIcon.setAttribute('src', 'img/eyeclose.png')
 }
}
