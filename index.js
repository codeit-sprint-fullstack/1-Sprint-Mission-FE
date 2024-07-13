document.addEventListener('DOMContentLoaded', function() {
  const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
  ];

  // 비밀번호 숨기기 기능
  $('.pass_form .close_pw').on('click', function() {
    $('#ps_input').attr('type', 'text');
    $(this).hide();
    $('.pass_form .open_ps').show();
  });

  $('.pass_form .open_ps').on('click', function() {
    $('#ps_input').attr('type', 'password');
    $(this).hide();
    $('.pass_form .close_pw').show();
  });

  $('.pass_form2 .close_pw2').on('click', function() {
    $('#ps_input2').attr('type', 'text');
    $(this).hide();
    $('.pass_form2 .open_ps2').show();
  });

  $('.pass_form2 .open_ps2').on('click', function() {
    $('#ps_input2').attr('type', 'password');
    $(this).hide();
    $('.pass_form2 .close_pw2').show();
  });

  // 이메일 유효성 검사
  var emailInput = document.getElementById('email_input');
  var errorMessage = document.getElementById('error_message');

  emailInput.addEventListener('input', function() {
    var email = emailInput.value;

    if (!isValidEmail(email)) {
      errorMessage.textContent = '이메일 형식이 일치하지 않습니다.';
      errorMessage.style.color = 'red';
      errorMessage.style.alignSelf = 'flex-start';
      errorMessage.style.marginBottom = '24px';
      errorMessage.style.marginLeft = '16px';
      emailInput.style.boxShadow = '0 0 0 2px red';
    } else {
      errorMessage.textContent = '';
      emailInput.style.boxShadow = '0 0 0 2px blue';
    }
  });

  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 비밀번호 8자리 이상 체크
  var passwordInput = document.getElementById('ps_input');
  var pwErrorMessage = document.getElementById('pw_error_message');

  passwordInput.addEventListener('input', function() {
    var password = passwordInput.value;

    if (password.length < 8) {
      pwErrorMessage.textContent = '비밀번호를 8자 이상 입력해주세요';
      pwErrorMessage.style.color = 'red';
      pwErrorMessage.style.alignSelf = 'flex-start';
      pwErrorMessage.style.marginBottom = '24px';
      pwErrorMessage.style.marginLeft = '16px';
      passwordInput.style.boxShadow = '0 0 0 2px red';
    } else {
      pwErrorMessage.textContent = '';
      passwordInput.style.boxShadow = '0 0 0 2px blue';
    }
  });

  // 이메일, 비밀번호 검사
  var loginButton = document.querySelector('.login_button');

  emailInput.addEventListener('input', function() {
    var email = emailInput.value;
    var password = passwordInput.value;

    if (email !== '' && isValidEmail(email) && password !== '' && password.length >= 8) {
      loginButton.style.backgroundColor = '#3692FF';
    } else {
      loginButton.style.backgroundColor = '#9CA3AF';
    }
  });
  passwordInput.addEventListener('input', function() {
    var email = emailInput.value;
    var password = passwordInput.value;

    if (email !== '' && isValidEmail(email) && password !== '' && password.length >= 8) {
      loginButton.style.backgroundColor = '#3692FF';
    } else {
      loginButton.style.backgroundColor = '#9CA3AF';
    }
  });
  

  //로그인 버튼 눌렀을때 객체 내에서 유효성 체크
  loginButton.addEventListener('click', function() {
    var customAlert = document.getElementById('customAlert');
    var email = emailInput.value;
    var password = passwordInput.value;
    var validUser = USER_DATA.find(user => user.email === email && user.password === password);

    if (validUser) {
      window.location.href = "item.html";
    } else {
      customAlert.style.display = 'flex';
    }
    document.getElementById('alertButton').addEventListener('click', function() {
      var customAlert = document.getElementById('customAlert');
      customAlert.style.display = 'none';
    });
    
  });
  

});


// 로그인 버튼 활성화 시켜야하고
// 미디어 쿼리 해줘야함