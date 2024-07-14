function isValidEmail(email) {
    return email.includes('@') && email.includes('.'); // 이메일 형식 검사를 위한 기존 방법 사용
  }
  
  function validatePassword(password) {
    return password.length >= 8;
  }
  
  function showError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  function hideError(inputElement, errorElement) {
    inputElement.classList.remove('error');
    errorElement.style.display = 'none';
  }
  
  function validateEmailInput(emailInput, emailError) {
    if (!emailInput.value) {
      showError(emailInput, emailError, '이메일을 입력해 주세요.');
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, emailError, '잘못된 이메일 형식입니다.');
    } else {
      hideError(emailInput, emailError);
    }
  }
  
  function validatePasswordInput(passwordInput, passwordError) {
    if (!passwordInput.value) {
      showError(passwordInput, passwordError, '비밀번호를 입력해 주세요.');
    } else if (passwordInput.value.length < 8) {
      showError(passwordInput, passwordError, '비밀번호를 8자 이상 입력해 주세요.');
    } else {
      hideError(passwordInput, passwordError);
    }
  }
  
  function checkLoginButtonState(emailInput, emailError, passwordInput, passwordError, loginButton) {
    const emailErrorVisible = emailError.style.display === 'block';
    const passwordErrorVisible = passwordError.style.display === 'block';
    const emailEmpty = !emailInput.value;
    const passwordEmpty = !passwordInput.value;
    loginButton.disabled = emailErrorVisible || passwordErrorVisible || emailEmpty || passwordEmpty; // 버튼 활성화 상태 결정
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('#login-form');
    const signupForm = document.querySelector('#signup-form');
  
    if (loginForm) {
      const loginEmail = loginForm.querySelector('#email');
      const loginEmailError = loginForm.querySelector('#emailError');
      const loginPassword = loginForm.querySelector('#password');
      const loginPasswordError = loginForm.querySelector('#passwordError');
      const loginButton = loginForm.querySelector('#loginButton');
  
      loginEmail.addEventListener('blur', function () {
        validateEmailInput(loginEmail, loginEmailError);
        checkLoginButtonState(loginEmail, loginEmailError, loginPassword, loginPasswordError, loginButton);
      });
  
      loginPassword.addEventListener('blur', function () {
        validatePasswordInput(loginPassword, loginPasswordError);
        checkLoginButtonState(loginEmail, loginEmailError, loginPassword, loginPasswordError, loginButton);
      });
  
      loginEmail.addEventListener('input', function () {
        checkLoginButtonState(loginEmail, loginEmailError, loginPassword, loginPasswordError, loginButton);
      });
  
      loginPassword.addEventListener('input', function () {
        checkLoginButtonState(loginEmail, loginEmailError, loginPassword, loginPasswordError, loginButton);
      });
  
      loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 기본 폼 제출 동작 방지
        validateEmailInput(loginEmail, loginEmailError);
        validatePasswordInput(loginPassword, loginPasswordError);
        if (!loginEmail.classList.contains('error') && !loginPassword.classList.contains('error')) {
          loginForm.submit();
        }
      });
    }
  
    if (signupForm) {
      const signupEmail = signupForm.querySelector('#email');
      const signupEmailError = signupForm.querySelector('#emailError');
      const signupPassword = signupForm.querySelector('#password');
      const signupPasswordError = signupForm.querySelector('#passwordError');
  
      signupEmail.addEventListener('blur', function () {
        validateEmailInput(signupEmail, signupEmailError);
      });
  
      signupPassword.addEventListener('blur', function () {
        validatePasswordInput(signupPassword, signupPasswordError);
      });
  
      signupForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 기본 폼 제출 동작 방지
        validateEmailInput(signupEmail, signupEmailError);
        validatePasswordInput(signupPassword, signupPasswordError);
        if (!signupEmail.classList.contains('error') && !signupPassword.classList.contains('error')) {
          signupForm.submit();
        }
      });
    }
  });
  