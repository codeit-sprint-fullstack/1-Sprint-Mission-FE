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
      updateSignupButton();
    } else {
      errorMessage.textContent = '';
      emailInput.style.boxShadow = '0 0 0 2px blue';
      updateSignupButton();
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
      updateSignupButton();
    } else {
      pwErrorMessage.textContent = '';
      passwordInput.style.boxShadow = '0 0 0 2px blue';
      updateSignupButton();
    }
  });

  
  // 닉네임 체크 name_input
  
  var nameInput = document.getElementById('name_input');
  
  nameInput.addEventListener('input', function() {
    var nameErrorMessage = document.getElementById('name_error_message');
    var nameInput = document.getElementById('name_input');
    if (nameInput.value.length >= 2) {
      nameInput.style.boxShadow = '0 0 0 2px blue';
      nameErrorMessage.textContent = '';
      updateSignupButton();
    } else {
      nameInput.style.boxShadow = '0 0 0 2px red';
      nameErrorMessage.textContent = '2개이상의 닉네임을 입력해주세요.'
      nameErrorMessage.style.color = 'red';
      nameErrorMessage.style.alignSelf = 'flex-start';
      nameErrorMessage.style.marginBottom = '24px';
      nameErrorMessage.style.marginLeft = '16px';
      updateSignupButton();
    }
  });

  //비밀번호 일치여부 확인
  
  var passwordInput2 = document.getElementById('ps_input2');
  
  passwordInput2.addEventListener('input', function() {
    var passwrod1 = document.getElementById('ps_input').value;
    var passwrod2 = document.getElementById('ps_input2').value;
    var errorMessage = document.getElementById('pw_error_message2');
    if (passwrod1 === passwrod2) {
      errorMessage.textContent = '';
      passwordInput2.style.boxShadow = '0 0 0 2px blue';
      updateSignupButton();
      
    }else{
      errorMessage.textContent = '비밀번호가 일치하지 않습니다.';
      errorMessage.style.color = 'red';
      errorMessage.style.alignSelf = 'flex-start';
      errorMessage.style.marginBottom = '24px';
      errorMessage.style.marginLeft = '16px';
      passwordInput2.style.boxShadow = '0 0 0 2px red';
      updateSignupButton();
    }

  });

  function updateSignupButton() {
    var signupButton = document.querySelector('.signup_button');
    var passwordInput2 = document.getElementById('ps_input2');
    var nameInput= document.getElementById('name_input');
    var emailInput = document.getElementById('email_input');
    var passwordInput = document.getElementById('ps_input');
    var pass2_shadow = passwordInput2.style.boxShadow;
    var name_shadow = nameInput.style.boxShadow;
    var email_shadow = emailInput.style.boxShadow;
    var pass_shadow = passwordInput.style.boxShadow;
    // 전역변수로 check_point = false 해놓고 각 조건문에 True , False 했는데 오류가 발생해서.. 이방법을 선택


    if (pass2_shadow === 'blue 0px 0px 0px 2px' && name_shadow === 'blue 0px 0px 0px 2px' && pass_shadow === 'blue 0px 0px 0px 2px' && email_shadow === 'blue 0px 0px 0px 2px') {
      signupButton.style.backgroundColor = '#3692FF';
    } else {
      signupButton.style.backgroundColor = '#9CA3AF';
    }
  
  
  }
  var signupButton = document.querySelector('.signup_button');
  signupButton.addEventListener('click', function() {
    var emailInput = document.getElementById('email_input');
    var customAlert = document.getElementById('customAlert');
    var alertButton = document.getElementById('alertButton'); // alertButton 가져오기

    var email = emailInput.value;
    var validUser = USER_DATA.find(user => user.email === email);

    if (validUser) {
      window.location.href = "login.html";
    } else {
      customAlert.style.display = 'flex';
    }

    // alertButton 클릭 이벤트 리스너
    alertButton.addEventListener('click', function() {
      customAlert.style.display = 'none';
    });
  });
});
