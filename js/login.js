import { USER_DATA } from './member.mjs';
import * as commJs from './common.js';

//비밀번호 보이기
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
});

// 회원 정보 확인
function logincheck() {
  var dialog_us = document.getElementById("dialog_user");
  var dialog_pw = document.querySelector('#dialog_pw');
  var e_check = 0;
  var p_check = 0;

  for (let i of USER_DATA) {
    if (email_input.value === i.email) {
      e_check = 0
      for (let j of USER_DATA) {
        if (pw_input.value === j.password) {
          p_check = 0;
          break;
        } else {
          p_check = 1;
        }
      } break;
    } else e_check = 2;
  }

  switch (e_check + p_check) {
    case 0:
      window.location.href = "item.html";
      break;
    case 1:
      dialog_pw.showModal();
      break;
    default:
      dialog_us.showModal();
      break;
  }
}

// 로그인 버튼 활성화
// 버튼 활성화를 위한 에러 체크(errorExist == 0) 
var btn = document.getElementById('login_btn');
var errorExist = 0;

function loginActivate(btn) {
  errorExist = a + c;
  if (errorExist == 0) {
    btn.removeAttribute('disabled');
    btn.style.backgroundColor = "#3692FF";
    btn.addEventListener('click', logincheck);
  } else {
    btn.setAttribute('disabled', '');
    btn.style.backgroundColor = "#9ca3af";
  }
}

// 이벤트리스너 사용
const email_input = document.querySelector('#email');
const pw_input = document.querySelector('#pw');
const html_e = document.querySelector('html');
var a, c;

email_input.addEventListener('focusout', function () {
  a = commJs.checkValue(email_input) + commJs.checkValue2(email_input);
});

pw_input.addEventListener('focusout', function () {
  c = commJs.checkValue(pw_input) + commJs.checkValue2(pw_input);
});

html_e.addEventListener('click', function () {
  loginActivate(btn);
});