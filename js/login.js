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

//로그인 pwd 확인
document.addEventListener('DOMContentLoaded', function () {
    let eyeBtns = document.querySelectorAll('.pwsetting img');
    let pwInput = document.getElementById('pw');

    eyeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (btn.classList.contains('non-show')) {
                pwInput.type = 'text';
                btn.style.display = 'none';
                document.querySelector('.show').style.display = 'inline-block';
            } else if (btn.classList.contains('show')) {
                pwInput.type = 'password';
                btn.style.display = 'none';
                document.querySelector('.non-show').style.display = 'inline-block';
            }
        });
    });
});

//user 유효성 검사
document.addEventListener('DOMContentLoaded', function () {
    let loginBtn = document.getElementById('login-btn');

    loginBtn.addEventListener('click', function () {
        let email = document.getElementById('e-mail').value;
        let password = document.getElementById('pw').value;
        let loginSuccess = false;
        const popup = document.getElementById('popup');
        const popupMessage = document.getElementById('popup-message');
        const popupCloseBtn = document.getElementById('popup-close-btn');
        const overlay = document.getElementById('overlay');

        for (let i = 0; i < USER_DATA.length; i++) {
            if (email === USER_DATA[i].email && password === USER_DATA[i].password) {
                loginSuccess = true;
                break;
            }
        }

        if (loginSuccess) {
            window.location.href = '../html/items.html';
        } else {
            popupMessage.textContent = '비밀번호가 일치하지 않습니다.';
            popup.style.display = 'block';
            overlay.style.display = 'block';
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
    let loginBtn = document.getElementById('login-btn');
    let emailcheck = document.getElementById('email-check');
    let passwordcheck = document.getElementById('password-check');

    //로그인 버튼 활성화
    function loginBtnColor() {
        if (email.value.includes('@') && email.value.includes('.com') && (password.value.length >= 8)) {
            loginBtn.style.cursor = 'pointer';
            loginBtn.style.pointerEvents='auto';
            loginBtn.style.backgroundColor = '#3692FF';
        } else {
            loginBtn.style.backgroundColor = '#9CA3AF';
            loginBtn.style.cursor = 'not-allowed';
            loginBtn.style.pointerEvents='none';
        }
    }

    function einputFocusOut() {
        if (!email.value) {
            emailcheck.style.display = 'flex';
            email.style.border = '1px solid #F74747';
        } else {
            if (email.value.includes('@') && email.value.includes('.com')) {
                emailcheck.style.display = 'none';
                email.style.border = 'none';
            } else {
                emailcheck.style.display = 'flex';
                emailcheck.textContent = '잘못된 이메일 형식입니다.';
                email.style.border = '1px solid #F74747';
            }
        }
    }

    function pinputFocusOut() {
        if (!password.value) {
            passwordcheck.style.display = 'flex';
            password.style.border = '1px solid #F74747';
        } else {
            if (password.value.length < 8) {
                passwordcheck.style.display = 'flex';
                passwordcheck.textContent = '비밀번호를 8자 이상 입력해주세요.';
                password.style.border = '1px solid #F74747';
            } else {
                password.style.border = 'none';
                passwordcheck.style.display = 'none';
            }
        }
    }

    function einputFocusIn() {
        emailcheck.style.display = 'none';
    }

    function pinputFocusIn() {
        passwordcheck.style.display = 'none';
    }

    email.addEventListener('blur', einputFocusOut);
    password.addEventListener('blur', pinputFocusOut);
    email.addEventListener('focus', einputFocusIn);
    password.addEventListener('focus', pinputFocusIn);
    email.addEventListener('input', loginBtnColor);
    password.addEventListener('input', loginBtnColor);
});