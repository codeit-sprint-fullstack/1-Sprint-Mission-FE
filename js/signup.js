import { initPasswordToggle, initEmailValidation, initPasswordValidation } from '../common/login_signup.js';
const USER_DATA = [{
        email: 'codeit1@codeit.com',
        password: "codeit101!"
    },
    {
        email: 'codeit2@codeit.com',
        password: "codeit202!"
    },
    {
        email: 'codeit3@codeit.com',
        password: "codeit303!"
    },
    {
        email: 'codeit4@codeit.com',
        password: "codeit404!"
    },
    {
        email: 'codeit5@codeit.com',
        password: "codeit505!"
    },
    {
        email: 'codeit6@codeit.com',
        password: "codeit606!"
    },
];

//비밀번호보기, email유효성, password유효성
document.addEventListener('DOMContentLoaded', function () {
    initPasswordToggle();

    let email = document.getElementById('e-mail');
    let emailcheck = document.getElementById('email-check');
    initEmailValidation(email, emailcheck);

    let password = document.getElementById('pw');
    let passwordmsg = document.getElementById('password-check');
    initPasswordValidation(password, passwordmsg);
});

//회원가입 check-pw 보기
document.addEventListener('DOMContentLoaded', function () {
    let eyeBtns = document.querySelectorAll('.pwsetting-check img');

    eyeBtns.forEach(function (btn) {
        let pwInput = document.getElementById('pwcheckagain');
        btn.addEventListener('click', function () {
            if (btn.classList.contains('non-show-check')) {
                pwInput.type = 'text';
                btn.style.display = 'none';
                document.querySelector('.show-check').style.display = 'inline-block';
            } else if (btn.classList.contains('show-check')) {
                pwInput.type = 'password';
                btn.style.display = 'none';
                document.querySelector('.non-show-check').style.display = 'inline-block';
            }
        });
    });
});

//userid 중복 확인
document.addEventListener('DOMContentLoaded', function () {
    let signupBtn = document.getElementById('signup-btn');

    signupBtn.addEventListener('click', function () {
        let emailInput = document.getElementById('e-mail');
        let email = emailInput.value;
        let joinSuccess = false; // 사용 중인 이메일이 아닐때
        const popup = document.getElementById('popup');
        const popupMessage = document.getElementById('popup-message');
        const popupCloseBtn = document.getElementById('popup-close-btn');
        const overlay = document.getElementById('overlay');

        for (let i = 0; i < USER_DATA.length; i++) {
            if (email === USER_DATA[i].email) {
                joinSuccess = true; // 사용 중인 이메일 일 때
                break;
            }
        }

        if (joinSuccess) {
            popupMessage.textContent = '사용 중인 이메일입니다.';
            popup.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            window.location.href = '../html/login.html';
        }
        popupCloseBtn.addEventListener('click', function () {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let email = document.getElementById('e-mail');
    let password = document.getElementById('pw');
    let signupBtn = document.getElementById('signup-btn');
    let passwordcheckagain = document.getElementById('pwcheckagain');
    let passwordcheckmsg = document.getElementById('password-check-again');
    let nickname = document.getElementById('nickname');

    //회원가입 버튼 활성화
    function signupBtnColor() {
        if (email.value.includes('@') && email.value.includes('.com') && (password.value.length >= 8) && nickname.value && (password.value===passwordcheckagain.value)) {
            signupBtn.style.cursor = 'pointer';
            signupBtn.style.pointerEvents = 'auto';
            signupBtn.style.backgroundColor = '#3692FF';
        } else {
            signupBtn.style.backgroundColor = '#9CA3AF';
            signupBtn.style.cursor = 'not-allowed';
            signupBtn.style.pointerEvents = 'none';
        }
    }

    //비밀번호 일치 유효성 검사
    function passwordCheckAgain() {
        if (password.value != passwordcheckagain.value) {
            passwordcheckmsg.style.display = 'flex';
            passwordcheckagain.style.border = '1px solid #F74747';
        } else {
            passwordcheckmsg.style.display = 'none';
            passwordcheckagain.style.border = 'none';
        }
    }

    passwordcheckagain.addEventListener('blur', passwordCheckAgain);
    email.addEventListener('input', signupBtnColor);
    password.addEventListener('input', signupBtnColor);
    nickname.addEventListener('input', signupBtnColor);
    passwordcheckagain.addEventListener('input', signupBtnColor);
});