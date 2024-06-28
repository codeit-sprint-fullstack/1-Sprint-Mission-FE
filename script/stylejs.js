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

const password_first = document.getElementById(password_first);
const confirmPassword = document.getElementById(password_conf_label);
const confirm_item = document.getElementById(confirm_item);

confirmPassword.onclick = function () {
    confirm_item.style.color = 'blue';
    if (password_first.value !== confirmPassword.value) {
        confirm_item.style.color = 'blue';
    }
}
