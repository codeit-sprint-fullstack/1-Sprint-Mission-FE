import { USER_DATA } from './member.mjs';
import * as commJs from './common.js';

// 비밀번호 보이기
$(function () {
  $('#showPassword').on('click', function () {
    var passwordField = $('#pw');
    var passwordFieldType = passwordField.attr('type');

    if (passwordFieldType == 'password') {
      passwordField.attr('type', 'text');
      $("#showPassword").css({ "background-image": "url('./img/eye_checkX.png')" });
    } else {
      passwordField.attr('type', 'password');
      $("#showPassword").css({ "background-image": "url('./img/eye_check.png')" });
    }
  });

  $('#showPassword2').on('click', function () {
    var passwordField = $('#pwCheck');
    var passwordFieldType = passwordField.attr('type');

    if (passwordFieldType == 'password') {
      passwordField.attr('type', 'text');
      $("#showPassword2").css({ "background-image": "url('./img/eye_checkX.png')" });
    } else {
      passwordField.attr('type', 'password');
      $("#showPassword2").css({ "background-image": "url('./img/eye_check.png')" });
    }
  });
});


// 회원 정보 확인
function signupcheck() {
  var dialog_em = document.getElementById("dialog_email");
  var e_check = 0;

  for (let i of USER_DATA) {
    if (email_input.value === i.email) {
      e_check = 1;
      break;
    } else e_check = 0;
  }

  switch (e_check) {
    case 0:
      window.location.href = "login.html";
      break;
    case 1:
      dialog_em.showModal();
      break;
  }
}

// 유효성 검사
// 회원가입 버튼 활성화
// 버튼 활성화를 위한 에러 체크(errorExist == 0) 
var btn = document.getElementById('signup_btn');
var errorExist = 0;

function signupActivate(btn) {
  errorExist = a + b + c + d + e;
  // console.log(','+a)
  // console.log(b)
  // console.log(c)
  // console.log(d)
  // console.log(e)
  // console.log(':' + errorExist )
  if (errorExist <= 0) {
    btn.removeAttribute('disabled');
    btn.style.backgroundColor = "#3692FF";
    btn.addEventListener('click', signupcheck);
  } else {
    btn.setAttribute('disabled', '');
    btn.style.backgroundColor = "#9ca3af";
  }
}

// 이벤트리스너 사용
const email_input = document.querySelector('#email');
const nick_input = document.querySelector('#nickname');
const pw_input = document.querySelector('#pw');
const pwC_input = document.querySelector('#pwCheck');
const html_e = document.querySelector('html');
var a, b, c, d, e;

email_input.addEventListener('focusout', function () {
  a = commJs.checkValue(email_input) + commJs.checkValue2(email_input);
});

nick_input.addEventListener('focusout', function () {
  b = commJs.checkValue(nick_input) + commJs.checkValue3(nick_input);
});

pw_input.addEventListener('focusout', function () {
  c = commJs.checkValue(pw_input) + commJs.checkValue2(pw_input)
  e = commJs.checkValue3(pw_input);
});

pwC_input.addEventListener('focusout', function () {
  d = commJs.checkValue(pwC_input) + commJs.checkValue3(pwC_input)
});

html_e.addEventListener('click', function () {
  signupActivate(btn);
});

