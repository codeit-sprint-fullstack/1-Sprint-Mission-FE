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

    email.addEventListener('input', loginBtnColor);
    password.addEventListener('input', loginBtnColor);
});