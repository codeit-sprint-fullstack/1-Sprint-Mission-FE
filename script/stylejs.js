import { USER_DATA, emailRegex, nameRegex, passwordRegex, passwordConfirmRegex, inputDisabledBtn } from './regex.js';

//아이콘 비밀번호 표시
const showHiddenPass = (loginpass, passEye) => {
    try {
        const input = document.getElementById(loginpass);
        const eye = document.getElementById(passEye);

        eye.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        })
    } catch (e) {
        console.log(e);
    }
}
showHiddenPass('password_first', 'eye_icon');
showHiddenPass('password_conf_label', 'conf_eye_icon');

//유효성검사
const password_first = document.querySelector('#password_first');
const userId = document.querySelector('#user_id');
const inputCheck = document.getElementsByTagName('input');
const hideCheck = document.getElementsByClassName('meg');
const form = document.querySelector('#form');
const submit_btn = document.querySelector('#submit_btn');

// form.addEventListener('focusout', (e) => {
//     const inputEl = e.target;
//     switch (e.target.dataset.content) {
//         case 'email':
//             // emailRegex(e);
//             renderValidation(inputEl, );
//             break;
//         case 'name':
//             nameRegex(e);
//             break;
//         case 'pwd':
//             passwordRegex(e);
//             break;
//         case 'pwdconfirm':
//             passwordConfirmRegex(e, password_first);
//             break;
//     }
//     if (inputDisabledBtn(hideCheck, inputCheck)) {
//         submit_btn.disabled = false;
//         submit_btn.style.backgroundColor = '#3692FF';
//     } else {
//         submit_btn.disabled = true;
//         submit_btn.style.backgroundColor = '#9CA3AF';
//     }
// })

form.addEventListener('focusout', (e) => {
    const inputEl = e.target;
    const elType = input.dataset.content;
    switch (inputEl.dataset.content) {
        case 'email':
            // emailRegex(e);
            renderValidation(inputEl, elType);
            break;
        case 'name':
            nameRegex(e);
            break;
        case 'pwd':
            passwordRegex(e);
            break;
        case 'pwdconfirm':
            passwordConfirmRegex(e, password_first);
            break;
    }
    if (inputDisabledBtn(hideCheck, inputCheck)) {
        submit_btn.disabled = false;
        submit_btn.style.backgroundColor = '#3692FF';
    } else {
        submit_btn.disabled = true;
        submit_btn.style.backgroundColor = '#9CA3AF';
    }
})


//로그인, 회원가입 submit event

const modalContainer = document.querySelector('#modal-container');
const modalPopup = document.querySelector('#modal');
const close = document.querySelector('#close');

submit_btn.addEventListener('click', (e) => {
    const submit = USER_DATA.find((user) => {
        return user.email === userId.value;
    });
    switch (e.target.dataset.content) {
        case 'login':
            if (submit) {
                if (submit.password === password_first.value) {
                    location.href = '../../nav/items.html';
                } else {
                    modalContainer.classList.add('show');
                    modalPopup.firstElementChild.textContent = '비밀번호가 일치하지 않습니다.';
                }
            } else {
                modalContainer.classList.add('show');
                modalPopup.firstElementChild.textContent = '등록된 사용자가 아닙니다.';
            }
            break;
        case 'signup':
            if (submit) {
                modalContainer.classList.add('show');
                modalPopup.firstElementChild.textContent = '사용 중인 이메일입니다';
            } else {
                try {
                    USER_DATA.push({ email: userId.value, password: password_first.value });
                    console.log(USER_DATA);
                    modalContainer.classList.add('show');
                    modalPopup.firstElementChild.textContent = '회원가입이 정상적으로 완료 되었습니다.';
                    modalPopup.lastElementChild.classList.add('btn_ok');
                } catch (e) {
                    console.log(e);
                }
            }
            break;
    }
});

close.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn_ok')) {
        modalContainer.classList.remove('show');
        location.href = '../../users/login.html';
    } else {
        modalContainer.classList.remove('show');
    }
})