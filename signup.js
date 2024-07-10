// 비밀번호 숨기기
const password = document.querySelector('.password');
const passIcon = document.querySelector('.pass_icon');
const checkIcon = document.querySelector('.check_icon');
const passwordCheck = document.querySelector('.password_check');

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
checkIcon.addEventListener('click', () => {showHide(passwordCheck,checkIcon)})

// 이메일 유효성 검사
const input = document.querySelector('input');
const userEmail = document.getElementById('user-email');
const failureMessage = document.querySelector('.failure-message');
const failureMessageTwo = document.querySelector('.failure-message2');
const pattern = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/;

userEmail.addEventListener('focusout', () => {
  if (userEmail.value === '') {
    failureMessage.classList.remove('hide');
    failureMessageTwo.classList.add('hide');
    input.classList.add('invalid-value');
    input.classList.remove('valid-value');
  } else if (!pattern.test(userEmail.value)) {      
    failureMessage.classList.add('hide');
    failureMessageTwo.classList.remove('hide');
    input.classList.add('invalid-value');
    input.classList.remove('valid-value');
  }
});

userEmail.addEventListener('keyup', () => {
  if (pattern.test(userEmail.value)) {
      failureMessage.classList.add('hide');
      failureMessageTwo.classList.add('hide');
      userEmail.classList.remove('invalid-value');
      userEmail.classList.add('valid-value');
    }
});
 
// 이메일 포커스
userEmail.addEventListener('focusin', () => {
  input.classList.add('blue-border');
})


//닉네임 유효성 검사
const nickName = document.querySelector('#user-nickname')
const nickNamePattern = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,}$/;

nickName.addEventListener('keyup', () => {
  if (nickNamePattern.test(nickName.value)) {
    nickName.classList.remove('invalid-value');
    nickName.classList.add('valid-value');
  } else if (!nickNamePattern.test(nickName.value)) {
    nickName.classList.remove('valid-value');
    nickName.classList.add('invalid-value');
  }
})

//닉네임 포커스
nickName.addEventListener('focusin', () => {
  nickName.classList.add('blue-border');
})


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


//비밀번호 확인 포커스
passwordCheck.addEventListener('focusin', () => {
  passwordCheck.classList.add('blue-border');
});

//비밀번호 확인 유효성 검사
const failureMessageFive = document.querySelector('.failure-message5');

passwordCheck.addEventListener('keyup', () => {
  if (passwordCheck.value.trim() === password.value.trim() && passwordCheck.value.length >= 8) {
    failureMessageFive.classList.add('hide');
    passwordCheck.classList.remove('invalid-value');
    passwordCheck.classList.add('valid-value');
  } else {
    failureMessageFive.classList.remove('hide');
    passwordCheck.classList.add('invalid-value');
    passwordCheck.classList.remove('valid-value');
  }
})

//버튼 활성화
const signupBtn = document.querySelector('.signup-btn');

userEmail.addEventListener('keyup', btnActivate);
password.addEventListener('keyup', btnActivate);
nickName.addEventListener('keyup', btnActivate);
passwordCheck.addEventListener('keyup', btnActivate);

function btnActivate() {
  switch (passwordCheck.value.trim() === password.value.trim() && password.value.length >= 8 && nickNamePattern.test(nickName.value) && pattern.test(userEmail.value)) {
    case false : 
      signupBtn.disabled = true; 
      signupBtn.classList.remove('signupBtn_activate')
      break;
    
    case true :
      signupBtn.disabled = false;
      signupBtn.classList.add('signupBtn_activate')   
      break;
  }
}

// 유저 데이터 베이스, 모달
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');

signupBtn.addEventListener('click', () => {
  const user = USER_DATA.find(userData => userData.email === userEmail.value)
  if (!user) {
    window.location.href = 'login.html'
  } else {
    modal.classList.remove('hidden')  
  }
})
modalCloseButton.addEventListener('click', () => {
  modal.classList.add('hidden')
})