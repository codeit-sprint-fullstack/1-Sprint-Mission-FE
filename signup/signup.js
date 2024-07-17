import {initPasswordToggle, initEmailValidation, initPasswordValidation} from '../common_js/login_signup.js';

const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" }
];

document.addEventListener('DOMContentLoaded', function () {
    initPasswordToggle(); // 비밀번호 보기

    const emailInput = document.getElementById('e-mail');
    const emailCheck = document.getElementById('email-check');
    const passwordInput = document.getElementById('pw');
    const passwordMsg = document.getElementById('password-check');
    const passwordCheckAgainInput = document.getElementById('pwcheckagain');
    const passwordCheckMsg = document.getElementById('password-check-again');
    const signupBtn = document.getElementById('signup-btn');
    const nicknameInput = document.getElementById('nickname');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupCloseBtn = document.getElementById('popup-close-btn');
    const overlay = document.getElementById('overlay');
    const eyeBtns = document.querySelectorAll('.pwsetting-check img');

    initEmailValidation(emailInput, emailCheck); // 이메일 유효성 검사
    initPasswordValidation(passwordInput, passwordMsg); // 비밀번호 유효성 검사

    // 비밀번호 확인 보기
    function passwordToggleHandler() {
        eyeBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                if (btn.classList.contains('show-check')) {
                    passwordCheckAgainInput.type = 'text';
                    btn.style.display = 'none';
                    // display: none 설정을 unset으로 변경
                    document.querySelector('.hide-check').style.display = 'unset';
                } else if (btn.classList.contains('hide-check')) {
                    passwordCheckAgainInput.type = 'password';
                    btn.style.display = 'none';
                    // display: none 설정을 unset으로 변경
                    document.querySelector('.show-check').style.display = 'unset';
                }
            });
        });
    }

    // 사용자 중복 체크
    function checkEmailDuplicate() {
        let joinSuccess = false;

        for (let i = 0; i < USER_DATA.length; i++) {
            if (emailInput.value === USER_DATA[i].email) {
                joinSuccess = true;
                break;
            }
        }

        if (joinSuccess) {
            popupMessage.textContent = '사용 중인 이메일입니다.';
            popup.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            window.location.href = '/login';
        }
    }

    // 팝업 닫기
    popupCloseBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    // 회원가입 버튼 활성/비활성
    function validateSignupBtn() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
        if ( // @, .com, 8자 이상, 닉네임 입력, 비밀번호 일치
            emailPattern.test(emailInput.value) &&
            passwordInput.value.length >= 8 &&
            nicknameInput.value &&
            passwordInput.value === passwordCheckAgainInput.value
        ) {
            signupBtn.style.cursor = 'pointer';
            signupBtn.style.pointerEvents = 'auto';
            signupBtn.style.backgroundColor = '#3692FF';
        } else {
            signupBtn.style.backgroundColor = '#9CA3AF';
            signupBtn.style.cursor = 'not-allowed';
            signupBtn.style.pointerEvents = 'none';
        }
    }

    //비밀번호 일치 검사
    function validatePasswordMatch() {
        if (passwordInput.value !== passwordCheckAgainInput.value) {
            passwordCheckMsg.style.display = 'flex';
            passwordCheckAgainInput.style.border = '1px solid #F74747';
        } else {
            passwordCheckMsg.style.display = 'none';
            passwordCheckAgainInput.style.border = 'none';
        }
    }

    passwordToggleHandler(); // 비밀번호 확인 보기 호출
    // 비밀번호 확인 인풋 포커스 아웃 시 일치 검사 호출
    passwordCheckAgainInput.addEventListener('blur', validatePasswordMatch);
    // 입력 필드 변화 시 회원가입 버튼 활성/비활성 호출
    emailInput.addEventListener('input', validateSignupBtn);
    passwordInput.addEventListener('input', validateSignupBtn);
    nicknameInput.addEventListener('input', validateSignupBtn);
    passwordCheckAgainInput.addEventListener('input', validateSignupBtn);
    // 회원가입 버튼 클릭 시 이메일 중복 체크 호출
    signupBtn.addEventListener('click', checkEmailDuplicate);
});