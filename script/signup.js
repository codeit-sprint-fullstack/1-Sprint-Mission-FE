const eyeCloseIcon = document.querySelector("#eye-close-icon");
const eyeShowIcon = document.querySelector('#eye-show-icon');
const rePwEyeCloseIcon = document.querySelector('#re-eye-close-icon');
const rePwEyeShowIcon = document.querySelector('#re-eye-show-icon');

const emailInput = document.querySelector('#email-input');
const emailError = document.querySelector('#email-error');
const passwordInput = document.querySelector('#password-input');
const passwordError = document.querySelector('#password-error');
const passwordReInput = document.querySelector('#password-repeat-input');
const passwordReError = document.querySelector('#password-repeat-error');
const nicknameInput = document.querySelector('#nickname');
const nicknameError = document.querySelector('#nickname-error')
const useBtn = document.querySelector('#button');

const signUpErrorDlg = document.querySelector('#password-error-dlg');
const dlgBtn = document.querySelector('#dialog-button');
const errorMsg = document.querySelector('#error-message');

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 비밀번호 입력시 eye-show-icon 보여주기
function eyeIconShow() {
  if(passwordInput.value !== '') {
    eyeShowIcon.classList.add('show');
  } else {
    eyeShowIcon.classList.remove('show');
  }
}

// 클릭시 비밀번호 type 전환 (text <-> password)
function eyeIconUse() {
  if(passwordInput.type == "password"){
    passwordInput.type = "text";
    eyeShowIcon.classList.remove('show');
    eyeCloseIcon.classList.add('show');
  } else {
    passwordInput.type = "password";
    eyeCloseIcon.classList.remove('show');
    eyeShowIcon.classList.add('show');
  }
}

// 비밀번호 입력시 re-eye-show-icon 보여주기
function rePwEyeIconShow() {
  if(passwordReInput.value !== '') {
    rePwEyeShowIcon.classList.add('show');
  } else {
    rePwEyeShowIcon.classList.remove('show');
  }
}

// 클릭시 비밀번호 확인 type 전환 (text <-> password)
function rePwEyeIconUse() {
  if(passwordReInput.type == "password"){
    passwordReInput.type = "text";
    rePwEyeShowIcon.classList.remove('show');
    rePwEyeCloseIcon.classList.add('show');
  } else {
    passwordReInput.type = "password";
    rePwEyeCloseIcon.classList.remove('show');
    rePwEyeShowIcon.classList.add('show');
  }
}

// "이메일을 입력해주세요." / "잘못된 이메일 형식입니다." 에러 메시지 출력
function validateEmail() {
  if (emailInput.value === '') {
    emailError.classList.add('show');
    emailError.innerHTML = "이메일을 입력해주세요.";
    emailInput.style.outline = '1px solid var(--red)';
  } else if (!emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.classList.add('show');
    emailError.innerHTML = "잘못된 이메일 형식입니다.";
    emailInput.style.outline = '1px solid var(--red)';
  } else {
    emailError.classList.remove('show');
    emailInput.style.outline = '';
  }
}

// 조건엔 딱히 제시된 것이 없지만, 닉네임 기재를 안하고 회원가입 가능은 아니라 생각해서 닉네임 에러도 추가하였습니다!
// "닉네임을 입력해주세요." 에러 메시지 출력
function validateNickname() {
  if (nicknameInput.value === '') {
    nicknameError.classList.add('show');
    nicknameError.innerHTML = '닉네임을 입력해주세요.';
    nicknameInput.style.outline = '1px solid var(--red)';
  } else {
    nicknameError.classList.remove('show');
    nicknameInput.style.outline = '';
  }
}

// "비밀번호를 입력해주세요." / "비밀번호를 8자 이상 입력해주세요." 에러 메시지 출력
function validatePassword() {
  if(passwordInput.value === '') {
    passwordError.classList.add('show');
    passwordError.innerHTML = '비밀번호를 입력해주세요.';
    passwordInput.style.outline = '1px solid var(--red)';
  } else if (passwordInput.value.length < 8) {
    passwordError.classList.add('show'); 
    passwordError.innerHTML = '비밀번호를 8자 이상 입력해주세요.';
    passwordInput.style.outline = '1px solid var(--red)';
  } else {
    passwordError.classList.remove('show');
    passwordInput.style.outline = '';
  }
}

// "비밀번호가 일치하지 않습니다." 에러 메시지 출력
function correctPassword() {
  if(passwordInput.value !== passwordReInput.value) {
    passwordReError.classList.add('show');
    passwordReError.innerHTML = '비밀번호가 일치하지 않습니다.';
    passwordReInput.style.outline = '1px solid var(--red)';
  } else {
    passwordReError.classList.remove('show');
    passwordReInput.style.outline = '';
  }
}

// 조건 만족시 버튼 활성화(회원가입)
useBtn.style.cursor = 'default';

function canUseSignUpBtn() {
  if (emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && 
  passwordInput.value.length > 7 && passwordInput.value === passwordReInput.value && nicknameInput.value !== '') {
    useBtn.disabled = false;
    useBtn.style.backgroundColor = 'var(--blue)';
    useBtn.style.cursor = 'pointer';
  } else {
    useBtn.disabled = true;
    useBtn.style.backgroundColor = '';
    useBtn.style.cursor = 'default';
  }
}
canUseSignUpBtn();    // 초기화면에서 버튼을 눌렀을 때, 실행되는 것을 막기 위해 함수호출

// 이메일 존재 여부 확인 후 회원가입 성공 / 실패
var link = 'login.html';

function SignUpSuccess() {
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const passwordReValue = passwordReInput.value;

  const user = USER_DATA.find((el) => emailValue === el.email);

  if (user) {
    signUpErrorDlg.style.display = 'flex';
    errorMsg.innerHTML = '사용 중인 이메일입니다.';
    signUpErrorDlg.showModal();
  } else {
    document.location.href = link;
  }
}

// dialog 확인 버튼 클릭 시, 모달 창 닫기
dlgBtn.addEventListener('click', () => {
  signUpErrorDlg.style.display = '';
  signUpErrorDlg.close();
})

passwordInput.addEventListener('input', eyeIconShow);
eyeCloseIcon.addEventListener('click', eyeIconUse);
eyeShowIcon.addEventListener('click', eyeIconUse);

passwordReInput.addEventListener('input', rePwEyeIconShow);
rePwEyeCloseIcon.addEventListener('click', rePwEyeIconUse);
rePwEyeShowIcon.addEventListener('click', rePwEyeIconUse);

emailInput.addEventListener('focusout', validateEmail);
nicknameInput.addEventListener('focusout', validateNickname);
passwordInput.addEventListener('focusout', validatePassword);
passwordReInput.addEventListener('focusout', correctPassword);

emailInput.addEventListener('input', canUseSignUpBtn);
nicknameInput.addEventListener('input', canUseSignUpBtn);
passwordInput.addEventListener('input', canUseSignUpBtn);
passwordReInput.addEventListener('input', canUseSignUpBtn);

useBtn.addEventListener('click', SignUpSuccess);
