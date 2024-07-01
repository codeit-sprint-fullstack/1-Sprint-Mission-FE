document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementsByClassName('login_button')[0];

    const emailErrorMessage = document.createElement('span');
    emailErrorMessage.textContent = '잘못된 이메일 입니다';
    emailErrorMessage.style.color = '#F74747';
    emailErrorMessage.style.fontSize = '15px';
    emailErrorMessage.style.fontWeight = '600';
    emailErrorMessage.style.marginTop = '-8px';
    emailErrorMessage.style.marginLeft = '16px';
    emailErrorMessage.style.display = 'none';

    emailInput.parentNode.appendChild(emailErrorMessage);

    const passwordErrorMessage = document.createElement('span');
    passwordErrorMessage.textContent = '비밀번호를 8자 이상 입력해주세요';
    passwordErrorMessage.style.color = '#F74747';
    passwordErrorMessage.style.fontSize = '15px';
    passwordErrorMessage.style.fontWeight = '600';
    passwordErrorMessage.style.marginTop = '-8px';
    passwordErrorMessage.style.marginLeft = '16px';
    passwordErrorMessage.style.display = 'none';

    passwordInput.parentNode.appendChild(passwordErrorMessage);

    function checkEmail() {
        const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const email_confirm = emailRegex.test(emailInput.value.trim());

        if (email_confirm) {
            emailErrorMessage.style.display = 'none';
            emailInput.style.border = 'none'
        } else {
            emailErrorMessage.style.display = 'block';
            emailInput.style.border = '1px solid #F74747';
            emailInput.style.borderRadius = '12px'
        }
        
    }

    function checkPassword() {
        if (passwordInput.value.trim().length >= 8) {
            passwordErrorMessage.style.display = 'none';
            passwordInput.style.border = 'none'
        } else {
            passwordErrorMessage.style.display = 'block';
            passwordInput.style.border = '1px solid #F74747';
            passwordInput.style.borderRadius = '12px'
        }
        
    }
    
    function InputCheck() {
        if (isValidEmail && passwordInput.value.trim().length >= 8) {
            loginButton.style.backgroundColor = '#3692FF';
            loginButton.style.border = 'none';
        } else {
            loginButton.style.backgroundColor = '#ccc';
            loginButton.style.border = '1px solid #ccc';
        }
    }

    emailInput.addEventListener('input', checkEmail);
    passwordInput.addEventListener('input', checkPassword);
    loginButton.addEventListener('input', InputCheck)
});
