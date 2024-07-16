import { lengthTest, emailTest, pwTest, compareFunc } from './globe.js';
import {checkValueForBtn, checkModule} from './globe.js';


const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
    { email: 'chdh1005@naver.com', password: "12341234" },
]

const emailEenterBox = document.querySelector('#email-enter-box');
const emailInput = emailEenterBox.querySelector('#id');

const pwEnterBox = document.querySelector('#pw-enter-box');
const pwlInput = pwEnterBox.querySelector('#pw');

const loginBtn = document.querySelector('#login-btn')


const checkEmail = e => {
    checkModule(e, emailEenterBox, emailInput);
    checkValueForBtn(loginBtn, emailInput, pwlInput)
}

const checkPassword = e => {
    checkModule(e, pwEnterBox, pwlInput);
    checkValueForBtn(loginBtn, emailInput, pwlInput)
}

const checkLoging = e => {
    const info = USER_DATA.find(user => user.email === emailInput.value)
    console.log(info)
    if (info) {
        if (info.password === pwlInput.value) {
            window.location.href = '../items.html'
        } else {
            alert ('비밀번호가 일치하지 않습니다.')
        }

    } else {
        alert ('비밀번호가 일치하지 않습니다.')
    }

}


emailInput.addEventListener('focusout', checkEmail)
pwlInput.addEventListener('focusout', checkPassword)
loginBtn.addEventListener('click',checkLoging)


////////////////////////////////////////////////////////////////////////
// const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const emailTest = (email) => re.test(String(email).toLowerCase());
// const pwTest = pw => pw.length < 8
// const checkLogin = function() {
//     if(emailInput.value && pwlInput.value) {
//         if (emailTest(emailInput.value) && !pwTest(pwlInput.value)) {
//             loginBtn.style.backgroundColor = '#3692FF';
//         }
//         else {
//             loginBtn.style.backgroundColor = '#9CA3AF';
//         }
//     }
//     console.log('로그인 검사 실행됨')
// }

// const checkEmail = function(e) {
//     const errorMessage = emailBox.querySelector('span');

//     if (!emailInput.value) {
//         emailInput.style.borderColor = '#F74747';
//         errorMessage.textContent = '이메일을 입력해주세요';
//         errorMessage.style.display = 'inline';
//     } else if (!emailTest(emailInput.value)) {
//         emailInput.style.borderColor = '#F74747';
//         errorMessage.textContent = '잘못된 이메일 형식입니다.'
//         errorMessage.style.display = 'inline'
//     } else {
//         emailInput.style.borderColor = '#FFFFFF';
//         errorMessage.textContent = ''

//     }
//     console.log('이메일 체크 실행됨')
//     console.log(emailInput.id)
//     checkLogin()

// }

// const checkPassword = e => {
//     const errorMessage = pwBox.querySelector('span');

//     if (!pwlInput.value) {
//         pwlInput.style.borderColor = '#F74747';
//         errorMessage.textContent = '비밀번호를 입력해주세요';
//         errorMessage.style.display = 'inline';
//     } else if (pwTest(pwlInput.value)) {
//         pwlInput.style.borderColor = '#F74747';
//         errorMessage.textContent = '비밀번호를 8자 이상 입력해주세요.'
//         errorMessage.style.display = 'inline'
//     } else {
//         pwlInput.style.borderColor = '#FFFFFF';
//         errorMessage.textContent = ''
//     }
//     console.log('비밀번호 체크 실행됨')
//     checkLogin()
// }

// emailInput.addEventListener('focusout', checkEmail)
// pwlInput.addEventListener('focusout', checkPassword)