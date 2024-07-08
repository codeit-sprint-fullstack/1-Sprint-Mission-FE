import { USER_DATA, disabledBtn, emailRegex, nameRegex, passwordRegex, passwordConfirmRegex } from './regex.js';

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
const hideCheck = document.getElementsByClassName('hide');
const form = document.querySelector('#form');
const submit_btn = document.querySelector('#submit_btn');

form.addEventListener('focusout', (e) => {
    switch (e.target.dataset.content) {
        case 'email':
            emailRegex(e);
            if (disabledBtn(inputCheck)) {
                console.log('성공');
                submit_btn.disabled = false;
                submit_btn.style.backgroundColor = '#3692FF';
            } else {
                console.log('실패');
                submit_btn.disabled = true;
                submit_btn.style.backgroundColor = '#9CA3AF';
            }
            break;
        case 'name':
            nameRegex(e);
            if (disabledBtn(userId, password_first)) {
                submit_btn.disabled = false;
                submit_btn.style.backgroundColor = '#3692FF';
            } else {
                submit_btn.disabled = true;
                submit_btn.style.backgroundColor = '#9CA3AF';
            }
            break;
        case 'pwd':
            passwordRegex(e);
            if (disabledBtn(inputCheck)) {
                console.log('성공');
                submit_btn.disabled = false;
                submit_btn.style.backgroundColor = '#3692FF';
            } else {
                console.log('실패');
                submit_btn.disabled = true;
                submit_btn.style.backgroundColor = '#9CA3AF';
            }
            break;
        case 'pwdconfirm':
            passwordConfirmRegex(e, password_first);
            if (disabledBtn(userId, password_first)) {
                submit_btn.disabled = false;
                submit_btn.style.backgroundColor = '#3692FF';
            } else {
                submit_btn.disabled = true;
                submit_btn.style.backgroundColor = '#9CA3AF';
            }
            break;
    }
})
