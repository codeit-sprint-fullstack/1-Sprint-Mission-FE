import { initPasswordToggle, initEmailValidation, initPasswordValidation } from '../common_js/login_signup.js';

const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" }
];

document.addEventListener('DOMContentLoaded', function () {
    initPasswordToggle(); // 비밀번호 보기 토클

    const emailInput = document.getElementById('e-mail');
    const emailCheck = document.getElementById('email-check');
    const passwordInput = document.getElementById('pw');
    const passwordMsg = document.getElementById('password-check');
    const loginBtn = document.getElementById('login-btn');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupCloseBtn = document.getElementById('popup-close-btn');
    const overlay = document.getElementById('overlay');

    initEmailValidation(emailInput, emailCheck); // 이메일 유효성 검사
    initPasswordValidation(passwordInput, passwordMsg); // 비밀번호 유효성 검사

    //사용자 유효성 검사
    function checkUserValidity() {
        let loginSuccess = false;

        for (let i = 0; i < USER_DATA.length; i++) {
            if (emailInput.value === USER_DATA[i].email && passwordInput.value === USER_DATA[i].password) {
                loginSuccess = true;
                break;
            }
        }

        if (loginSuccess) {
            window.location.href = '/items';
        } else {
            popupMessage.textContent = '비밀번호가 일치하지 않습니다.';
            popup.style.display = 'block';
            overlay.style.display = 'block';
        }

        // 팝업 닫기
        popupCloseBtn.addEventListener('click', function () {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });
    }

    // 로그인 버튼 활성/비활성
    function updateLoginBtnState() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
        if (emailPattern.test(emailInput.value) && passwordInput.value.length >= 8) {
            loginBtn.style.cursor = 'pointer';
            loginBtn.style.pointerEvents = 'auto';
            loginBtn.style.backgroundColor = '#3692FF';
        } else {
            loginBtn.style.backgroundColor = '#9CA3AF';
            loginBtn.style.cursor = 'not-allowed';
            loginBtn.style.pointerEvents = 'none';
        }
    }
    // 입력 필드 변화시 로그인 버튼
    emailInput.addEventListener('input', updateLoginBtnState);
    passwordInput.addEventListener('input', updateLoginBtnState);
    // 로그인 버튼 클릭 -> 사용자 유효성 검사
    loginBtn.addEventListener('click', checkUserValidity);
});