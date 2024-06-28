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

showHiddenPass('password_first', 'eye_icon');
showHiddenPass('password_conf_label', 'conf_eye_icon');

const password_first = document.getElementById('password_first');
const confirmPassword = document.getElementById('password_conf_label');
const confirm_item = document.getElementById('confirm_pass_item');
const password_item = document.getElementById('password_item');

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

password_first.onkeyup = function () {
    if (password_item.value != 0) {
        if (passwordRegex.test(password_first.value)) {
            password_item.classList.add('hide');
        } else {
            password_item.classList.remove('hide');
        }
    } else {
        password_item.classList.add('hide');
    }
}

confirmPassword.onkeyup = function () {
    if (password_first.value === confirmPassword.value) {
        confirm_item.classList.add('hide');
    }
    else {
        confirm_item.classList.remove('hide');
    }
}
