import * as lgn from "/Lib/public.js"

const user_email = document.querySelector('#login_email'); 
const user_password = document.querySelector('#login_password');
const togglePassword = document.querySelector(".password-toggle-icon i");
const login_button = document.querySelector('.login_box');
const modal_button = document.querySelector('.modal_button');

// ----------------------------------------------------------

// 로그인
const login = () => {

    const login_button_list = Array.from(login_button.classList);
    const modal = document.querySelector('.modal_none');
    const modal_button = document.querySelector('.modal_button');

    if (login_button_list.find((e) => e === 'login_box_activate')) {

        if (USER_DATA.find((n) => n.email === user_email.value && n.password === user_password.value)) {

            window.location.href = '/items';

        } else {
            modal.className = 'modal';
            setTimeout(() => {modal_focus(modal_button)}, 100);
        }
    }
}

// 로그인 버튼 활성화
const login_activat = () => {

    if (user_password.value.length >= 8 && email_text.test(user_email.value) === true ) {
        login_button.className = 'login_box';
        login_button.classList.add('login_box_activate');

    } else {
        login_button.className = 'login_box';
        login_button.classList.add('login_box_no_activate');
    }
}

// login page enter key의 focus 이동
const login_focus_doing = (e) => {
    if (e.key === 'Enter' && document.activeElement === user_email) {
        user_password.focus();

    } else if (e.key === 'Enter' && document.activeElement === user_password) {
        login_button.focus();
        setTimeout(login, 100);
    }
}


// ----------------------------------------------------------

// password 토글 
togglePassword.addEventListener('click', () => {
    lgn.toggle_icon(user_password, togglePassword);
});

// error 메세지
user_email.addEventListener('focusout', () => 
    {lgn.error_email(user_email);
});
user_email.addEventListener('keyup', () => {
    lgn.error_keydown_email(user_email);
});
user_password.addEventListener('focusout', () => {
    lgn.error_password(user_password);
});
user_password.addEventListener('keyup', () => {
    lgn.error_keydown_password(user_password);
});

// // enter로 focus 이동
user_email.addEventListener('keyup', login_focus_doing);
user_password.addEventListener('keyup', login_focus_doing);

// // 로그인 버튼 활성화
user_email.addEventListener('focusout', login_activat);
user_email.addEventListener('keyup', login_activat);
user_password.addEventListener('focusout', login_activat);
user_password.addEventListener('keyup', login_activat);

// // 로그인
login_button.addEventListener('click', login);

// // 모달창 닫기
modal_button.addEventListener('click', lgn.modal_close);