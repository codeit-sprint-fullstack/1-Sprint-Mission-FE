//로그인 - 회원가입 공통 모듈

var error = 1;
var error_double = 0;

// 이메일 유효성 검사 함수
function emailCheck(input, warning) {
  var inValue = input.value;
  var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  if (!email_regex.test(inValue)) {
    warning.innerHTML = "잘못된 이메일 형식입니다.";
    input.style.border = '1px solid red';
    error = 100;
  } else {
    error = 0;
    input.style.border = 'none';
  }
}

//닉네임 유효성 검사 함수
function nickCheck(input, warning) {
  var inValue = input.value;

  if (inValue.length < 2) {
    warning.innerHTML = '닉네임을 2자 이상 입력해주세요.';
    input.style.border = '1px solid red';
    error = 100;
  } else {
    error = 0;
    input.style.border = 'none';
  }
}

// 비밀번호 유효성 검사 함수
function pwCheck(input, warning, field) {
  var inValue = input.value;

  if (inValue.length < 8) {
    warning.innerHTML = field + '를 8자 이상 입력해주세요.';
    input.style.border = '1px solid red';
    error = 100;
  } else {
    error = 0;
    input.style.border = 'none';
  }
}

// 비밀번호 동일
function pwEqualCheck(pw_input, pwC_input, warning) {
  if (pw_input.value == pwC_input.value) {
    error = 0;
    error_double = -100;
    pwC_input.style.border = 'none';
  } else {
    warning.innerHTML = '비밀번호가 일치하지 않습니다.';
    pwC_input.style.border = '1px solid red';
    error = 100;
    error_double = 0;
  }
}

// 유효성 검사
export function checkValue(input) {
  var inputLogin = input.parentElement;
  var field = input.getAttribute('field');
  var warning = document.createElement('span');

  if (!input.value) {
    if (field.includes("비밀번호")) {
      warning.innerHTML = field + '를 입력해주세요';
    } else {
      warning.innerHTML = field + '을 입력해주세요';
    }
    input.style.border = '1px solid red';
    inputLogin.appendChild(warning);
    // error = 10;
    error = 100;

    input.addEventListener('focusin', () => {
      warning.remove();
    });
  } else error = 0;
  return error;
}

// 유효성 검사 - 이메일, 비밀번호 
export function checkValue2(input) {
  var inputLogin = input.parentElement;
  var field = input.getAttribute('field');
  var warning = document.createElement('span');

  if (input.value) {
    if (field.includes("이메일")) {
      emailCheck(input, warning);
    } else {
      pwCheck(input, warning, field);
    }

    inputLogin.appendChild(warning);
    input.addEventListener('focusin', () => {
      warning.remove();
    })
  } return error;
}

// 유효성 검사 - 닉네임, 비밀번호 확인 
export function checkValue3(input) {
  var inputLogin = input.parentNode;
  var pwWarning = document.getElementById('pwWarning');
  var field = input.getAttribute('field');
  var warning = document.createElement('span');
  var pwC_input = document.querySelector('#pwCheck');
  var pw_input = document.querySelector('#pw');

  if (input.value) {
    if (field.includes("닉네임")) {
      nickCheck(input, warning, inputLogin);
      inputLogin.appendChild(warning);

      input.addEventListener('focusin', () => {
        warning.remove();
      }); 
      return error;
    } else if (field.includes("확인 비밀번호")) {
      warning.setAttribute('id', 'pwWarning');
      pwEqualCheck(pw_input, input, warning);
      inputLogin.appendChild(warning);
    } else if (field.startsWith("비밀번호")) {
      if (!Object.is(pwC_input.value, '')) {
        pwWarning.style.display = 'none';
        pwEqualCheck(pw_input, pwC_input, warning);
        if (!Object.is(warning.innerHTML, '')) {
          pwWarning.innerHTML = warning.innerHTML
          pwWarning.style.display = 'block';
        } 
      }
      return error_double;
    }
    input.addEventListener('focusin', () => {
      warning.remove();
    })
  } return error;
}