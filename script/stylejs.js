//아이콘 비밀번호 표시
const showHiddenPass = (loginpass, passEye) => {
    const input = document.getElementById(loginpass);
    const eye = document.getElementById(passEye);

    eye.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    })
}

//비밀번호체크
const passwrod = document.getElementById(passwrod);
const conf = document.getElementById(passconf);
const confirmPassword = document.getElementById(confirm_item);

conf.onkeyup = function () {
    if (input.value !== conf.value) {
        confirmPassword.style.display = '';
    }
}

showHiddenPass('password', 'eye_icon');
