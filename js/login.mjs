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
export function seeLoginPw() {
    document.addEventListener('DOMContentLoaded', function () {
        const eyeBtns = document.querySelectorAll('.pwsetting img');
        const pwInput = document.getElementById('pw');

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
}

export function userId() {
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('e-mail');
    const passwordInput = document.getElementById('pw');

    loginBtn.addEventListener('click', function () {
        const email = emailInput.value;
        const password = passwordInput.value;
        let loginSuccess = false;

        for (let i = 0; i < USER_DATA.length; i++) {
            if (email === USER_DATA[i].email && password === USER_DATA[i].password) {
                loginSuccess = true;
                break;
            }
        }

        if (loginSuccess) {
            window.location.href='../html/items.html';
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    });
}