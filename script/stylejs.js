import { USER_DATA, inputDisabledBtn, renderValidation } from './regex.js';

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

form.addEventListener('focusout', (e) => {
    const inputEl = e.target;
    const elType = inputEl.dataset.content;
    
    if(elType === 'pwdconfirm') {
        renderValidation(inputEl, elType, password_first.value)
    } else {
        renderValidation(inputEl, elType)   
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
const alertMeg = document.querySelector('alert_meg');

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
                    alertMeg.textContent = '비밀번호가 일치하지 않습니다.';
                }
            } else {
                modalContainer.classList.add('show');
                alertMeg.textContent = '등록된 사용자가 아닙니다.';
            }
            break;
        case 'signup':
            if (submit) {
                modalContainer.classList.add('show');
                alertMeg.textContent = '사용 중인 이메일입니다';
            } else {
                try {
                    USER_DATA.push({ email: userId.value, password: password_first.value });
                    modalContainer.classList.add('show');
                    alertMeg.textContent = '회원가입이 정상적으로 완료 되었습니다.';
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