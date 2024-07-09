// 비밀번호 숨기기/표시하기
const password = document.querySelector('.password');
const passIcon = document.querySelector('.pass_icon');

function showHide(b,a) {
   if (b.type === 'password') {
   b.setAttribute('type','text');
   a.setAttribute('src', 'img/eyeopen.png');
   } else {
   b.setAttribute('type', 'password');
   a.setAttribute('src', 'img/eyeclose.png');
 }
};

passIcon.addEventListener('click', () => {showHide(password,passIcon)})

// 이메일 유효성 검사
const input = document.querySelector('input');
const email = document.getElementById('user-email');
const failureMessage = document.querySelector('.failure-message');
const failureMessageTwo = document.querySelector('.failure-message2');
const pattern = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/;

email.addEventListener('focusout', () => {
  if (email.value === '') {
    failureMessage.classList.remove('hide');
    failureMessageTwo.classList.add('hide');
    input.classList.add('invalid-value');
    input.classList.remove('valid-value');
  } else if (!pattern.test(email.value)) {      
    failureMessage.classList.add('hide');
    failureMessageTwo.classList.remove('hide');
    input.classList.add('invalid-value');
    input.classList.remove('valid-value');
    }
  }
);

// 이메일 포커스
email.addEventListener('focusin', () => {
  input.classList.add('blue-border');
})

email.addEventListener('keyup', () => {
  if (pattern.test(email.value)) {
      failureMessage.classList.add('hide');
      failureMessageTwo.classList.add('hide');
      email.classList.remove('invalid-value');
      email.classList.add('valid-value');
    }
});
 

// 비밀버호 유효성 검사
const failureMessageThree = document.querySelector('.failure-message3');
const failureMessageFour = document.querySelector('.failure-message4');

password.addEventListener('focusout', () => {
  if (password.value === '') {
    failureMessageThree.classList.remove('hide');
    failureMessageFour.classList.add('hide');
    password.classList.add('invalid-value');
    password.classList.remove('valid-value');
  } else if (password.value.length < 8) {
    failureMessageThree.classList.add('hide');
    failureMessageFour.classList.remove('hide');
    password.classList.add('invalid-value');
    password.classList.remove('valid-value');
    }
});

password.addEventListener('keyup', () => {
  if (password.value.length >= 8) {
      failureMessageThree.classList.add('hide');
      failureMessageFour.classList.add('hide');
      password.classList.remove('invalid-value');
      password.classList.add('valid-value');
    } 
});
 
// 비밀번호 포커스
  password.addEventListener('focusin', () => {
  password.classList.add('blue-border');
});

// 버튼 활성화
const loginBtn = document.querySelector('button');

email.addEventListener('keyup', btnActivate);
password.addEventListener('keyup', btnActivate);
function btnActivate() {
  switch((pattern.test(email.value)) && password.value.length >= 8) {
    case false : 
    loginBtn.disabled = true; 
    loginBtn.classList.remove('loginBtn_activate')
    break;
    
    case true :
    loginBtn.disabled = false;
    loginBtn.classList.add('loginBtn_activate')
    break;
  }
}


// 유저 데이터 베이스
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];