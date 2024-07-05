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


// 회원가입 pw 확인
export function seeJoinPw() {
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
//회원가입 check-pw 확인
export function checkJoinPw() {
    document.addEventListener('DOMContentLoaded', function () {
        const eyeBtns = document.querySelectorAll('.pwsetting-check img');
        const pwInput = document.getElementById('pwcheck');

        eyeBtns.forEach(function (btn) {
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
}

//userid 중복 확인
export function check_userId() {
    const emailInput = document.getElementById('e-mail');
    const signupBtn = document.getElementById('signup-btn');

    signupBtn.addEventListener('click', function () {
        const email = emailInput.value;
        let joinSuccess = false; // 사용 중인 이메일이 아닐때

        for (let i = 0; i < USER_DATA.length; i++) {
            if (email === USER_DATA[i].email) {
                joinSuccess = true; // 사용 중인 이메일 일 때
                break;
            }
        }

        if (joinSuccess) {
            alert('사용 중인 이메일입니다.');
        } else {
            window.location.href = '../html/login.html';
        }
    });
}
