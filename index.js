const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];
// 비밀번호 숨기기 기능
$(document).ready(function(){
  $('.pass_form .close_pw').on('click', function(){
      $('#ps_input').attr('type', 'text');
      $(this).hide();
      $('.pass_form .open_ps').show();
  });

  $('.pass_form .open_ps').on('click', function(){
      $('#ps_input').attr('type', 'password');
      $(this).hide();
      $('.pass_form .close_pw').show();
  });
});

//<input class="input_box" placeholder="이메일을 입력해주세요" type="eamil">
//<div class="error" id="error_message"></div>
//이메일 유효성 검사
document.addEventListener('DOMContentLoaded', function() {
  var emailInput = document.getElementById('email_input');
  var errorMessage = document.getElementById('error_message');

  emailInput.addEventListener('input', function() {
    var email = emailInput.value;

    if (!isValidEmail(email)) {
      errorMessage.textContent = '이메일 형식이 일치하지 않습니다.';
      errorMessage.style.color = 'red';
      errorMessage.style.alignSelf = 'flex-start';
      errorMessage.style.marginBottom = '24px';
    } else {
      errorMessage.textContent = '';
    }
  });

  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});


