const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' },
];

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function showError(input, message) {
  let errorElement = input.parentElement.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    input.parentElement.appendChild(errorElement);
  }
  input.style.borderColor = 'red';
  errorElement.textContent = message;
  errorElement.style.color = 'red';
  errorElement.style.display = 'block';
}

function hideError(input) {
  const errorElement = input.parentElement.querySelector('.error-message');
  if (errorElement) {
    input.style.borderColor = '';
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
}

const emailInput = document.getElementById('email');
emailInput.addEventListener('focusout', () => {
  const emailValue = emailInput.value;
  if (!emailValue) {
    showError(emailInput, '이메일을 입력해주세요.');
  } else if (!validateEmail(emailValue)) {
    showError(emailInput, '잘못된 이메일 형식입니다');
  } else {
    hideError(emailInput);
  }
});

const passwordInput = document.getElementById('password');
passwordInput.addEventListener('focusout', () => {
  const passwordValue = passwordInput.value;
  if (!passwordValue) {
    showError(passwordInput, '비밀번호를 입력해주세요.');
  } else if (!validatePassword(passwordValue)) {
    showError(passwordInput, '비밀번호를 8자 이상 입력해주세요.');
  } else {
    hideError(passwordInput);
  }
});

const passwordConfirmInput = document.getElementById('passwordConfirmation');
passwordConfirmInput.addEventListener('focusout', () => {
  const passwordValue = passwordInput.value;
  const passwordConfirmValue = passwordConfirmInput.value;
  if (!passwordConfirmValue) {
    showError(passwordConfirmInput, '비밀번호 확인을 입력해주세요.');
  } else if (passwordConfirmValue !== passwordValue) {
    showError(passwordConfirmInput, '비밀번호가 일치하지 않습니다.');
  } else {
    hideError(passwordConfirmInput);
  }
});

const signupButton = document.querySelector('button[type="submit"]');
const inputs = [emailInput, passwordInput, passwordConfirmInput];

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (
      inputs.some(
        (input) =>
          !input.value ||
          input.parentElement.querySelector('.error-message')?.textContent
      )
    ) {
      signupButton.disabled = true;
    } else {
      signupButton.disabled = false;
    }
  });
});

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const passwordConfirmValue = passwordConfirmInput.value;

  if (USER_DATA.some((user) => user.email === emailValue)) {
    alert('사용 중인 이메일입니다');
  } else if (passwordValue !== passwordConfirmValue) {
    showError(passwordConfirmInput, '비밀번호가 일치하지 않습니다.');
  } else {
    USER_DATA.push({ email: emailValue, password: passwordValue });
    alert('회원가입이 완료되었습니다.');
    window.location.href = '/login.html';
  }
});
