export function initPasswordToggle() {
    let eyeBtns = document.querySelectorAll('.pwsetting img');

    eyeBtns.forEach(function (btn) {
        let pwInput = document.getElementById('pw');
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
}

// 이메일 유효성 검사 기능
export function initEmailValidation(email, emailcheck) {
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

    function einputFocusIn() {
        emailcheck.style.display = 'none';
    }

    email.addEventListener('blur', einputFocusOut);
    email.addEventListener('focus', einputFocusIn);
}

// 비밀번호 유효성 검사 기능
export function initPasswordValidation(password, passwordmsg) {
    function pinputFocusOut() {
        if (!password.value) {
            passwordmsg.style.display = 'flex';
            password.style.border = '1px solid #F74747';
        } else {
            if (password.value.length < 8) {
                passwordmsg.style.display = 'flex';
                passwordmsg.textContent = '비밀번호를 8자 이상 입력해주세요.';
                password.style.border = '1px solid #F74747';
            } else {
                password.style.border = 'none';
                passwordmsg.style.display = 'none';
            }
        }
    }

    function pinputFocusIn() {
        passwordmsg.style.display = 'none';
    }

    password.addEventListener('blur', pinputFocusOut);
    password.addEventListener('focus', pinputFocusIn);
}