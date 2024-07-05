import { emailRegex, passwordRegex } from './regex.js';

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
// showHiddenPass('password_conf_label', 'conf_eye_icon');

//유효성검사
const password_first = document.querySelector('#password_first');
const confirmPassword = document.querySelector('#password_conf_label');
const confirm_item = document.querySelector('#confirm_pass_item');
const userId = document.querySelector('#user_id');
const password_item = document.querySelector('#password_item');
const inputCheck = document.getElementsByTagName('input');
const form = document.querySelector('#form');

form.addEventListener('focusout', (e) => {
    switch (e.target.dataset.content) {
        case 'email':
            emailRegex(e);
            break;
        case 'pwd':
            passwordRegex(e);
            break;
    }
})

form.addEventListener('change', (e) => {
    Array.from(inputCheck).forEach((e) => {
        console.log(e.value);
    })
})
