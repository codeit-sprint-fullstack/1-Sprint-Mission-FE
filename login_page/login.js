const emailBox = document.querySelectorAll('.enter-box')[0];
const emailInput = emailBox.querySelector('#input-id');

const pwBox = document.querySelectorAll('.enter-box')[1];
const pwlInput = pwBox.querySelector('#input-pw');

const loginBtn = document.querySelector('#login-btn')

const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isItEmail = (Stringvalue) => re.test(String(Stringvalue).toLowerCase());


const checkLogin = e => {
    if(emailInput.value && pwlInput.value) {
        if (isItEmail(emailInput.value) && pwlInput.value.length >= 8) {
            loginBtn.style.backgroundColor = '#3692FF';
        }
        else {
            loginBtn.style.backgroundColor = '#9CA3AF';
        }
    }
    console.log('로그인 검사 실행됨')

}

const checkEmail = function(e) {
    const errorMessage = emailBox.querySelector('span');

    if (!emailInput.value) {
        emailInput.style.borderColor = '#F74747';
        errorMessage.textContent = '이메일을 입력해주세요';
        errorMessage.style.display = 'inline';
    } else if (!isItEmail(emailInput.value)) {
        emailInput.style.borderColor = '#F74747';
        errorMessage.textContent = '잘못된 이메일 형식입니다.'
        errorMessage.style.display = 'inline'
    } else {
        emailInput.style.borderColor = '#FFFFFF';
        errorMessage.style.display = 'none'

    }
    console.log('이메일 체크 실행됨')
    checkLogin()
}

const checkPassword = e => {
    const errorMessage = pwBox.querySelector('span');

    if (!pwlInput.value) {
        pwlInput.style.borderColor = '#F74747';
        errorMessage.textContent = '비밀번호를 입력해주세요';
        errorMessage.style.display = 'inline';
    } else if (pwlInput.value.length < 8) {
        pwlInput.style.borderColor = '#F74747';
        errorMessage.textContent = '비밀번호를 8자 이상 입력해주세요.'
        errorMessage.style.display = 'inline'
    } else {
        pwlInput.style.borderColor = '#FFFFFF';
        errorMessage.style.display = 'none'
    }
    console.log('비밀번호 체크 실행됨')
    checkLogin()
}

emailInput.addEventListener('focusout', checkEmail)
pwlInput.addEventListener('focusout', checkPassword)

