// 비밀번호 표시하기/숨기기
const checkIcon = document.querySelector('.check_icon');
const passwordCheck = document.querySelector('.password_check');
import { password, passIcon, showHide } from '../components/showHide.js '

passIcon.addEventListener('click', () => showHide(password,passIcon))
checkIcon.addEventListener('click', () => showHide(passwordCheck,checkIcon))

// 이메일 유효성 검사
import { pattern } from '../components/regex.js'
import { failureMessage, failureMessageTwo, input, userEmail } from '../components/emailValid.js';

userEmail.addEventListener('focusout', () => {
  if (userEmail.value === '') {
    failureMessageTwo.classList.add('hide');
    failureMessage.classList.remove('hide');
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
      userEmail.classList.add('valid-value');
      userEmail.classList.remove('invalid-value');
    }
});

//닉네임 유효성 검사
import { nickNamePattern } from '../components/regex.js';
const nickName = document.querySelector('#user-nickname');

function nickNameValid () {
  if (nickNamePattern.test(nickName.value.trim())) {
    nickName.classList.add('valid-value');
    nickName.classList.remove('invalid-value'); 
  } else {
    nickName.classList.remove('valid-value');
    nickName.classList.add('invalid-value');
  }
};
nickName.addEventListener('keyup', nickNameValid);
nickName.addEventListener('focusout', nickNameValid);

// 비밀번호 유효성 검사
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

// 비밀번호 확인 유효성 검사
const failureMessageFive = document.querySelector('.failure-message5');

function passwordValid () {
  if ((passwordCheck.value.trim() === password.value.trim()) && passwordCheck.value.length >= 8){
    failureMessageFive.classList.add('hide');
    passwordCheck.classList.remove('invalid-value');
    passwordCheck.classList.add('valid-value');
  } else if ((passwordCheck.value.trim() !== password.value.trim()) || passwordCheck.value === '') {
    failureMessageFive.classList.remove('hide');
    passwordCheck.classList.add('invalid-value');
    passwordCheck.classList.remove('valid-value');
  } else if (passwordCheck.value === password.value && passwordCheck.value.length < 8) {
    failureMessageFive.classList.add('hide');
    passwordCheck.classList.add('invalid-value');
    passwordCheck.classList.remove('valid-value');
  }
}

function passwordValid2 () {
  if ((passwordCheck.value.trim() === password.value.trim()) && passwordCheck.value.length >= 8){
    failureMessageFive.classList.add('hide');
    passwordCheck.classList.remove('invalid-value');
    passwordCheck.classList.add('valid-value');
  } else if ((passwordCheck.value.trim() !== password.value.trim()) && passwordCheck.value !== '') {
    failureMessageFive.classList.remove('hide');
    passwordCheck.classList.add('invalid-value');
    passwordCheck.classList.remove('valid-value');
  }
}
password.addEventListener('keyup', passwordValid2);
passwordCheck.addEventListener('keyup', passwordValid);
passwordCheck.addEventListener('focusout', passwordValid);

// 버튼 활성화
const signupBtn = document.querySelector('.signup-btn');

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

password.addEventListener('keyup', btnActivate);
nickName.addEventListener('keyup', btnActivate);
userEmail.addEventListener('keyup', btnActivate);
passwordCheck.addEventListener('keyup', btnActivate);

// 유저 데이터 베이스, 모달
const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');
import { USER_DATA } from '../components/userData.js';

signupBtn.addEventListener('click', () => {
  const user = USER_DATA.find(userData => userData.email === userEmail.value)
  if (!user) {
    window.location.href = '../login/index.html'
  } else {
    modal.classList.remove('hidden')  
  }
})

modalCloseButton.addEventListener('click', () => {
  modal.classList.add('hidden')
})

// 인풋 포커스인
import focusIn from '../components/focus.js';

userEmail.addEventListener('focusin', () => focusIn(input));
nickName.addEventListener('focusin', () => focusIn(nickName));
password.addEventListener('focusin', () => focusIn(password));
passwordCheck.addEventListener('focusin', () => focusIn(passwordCheck));