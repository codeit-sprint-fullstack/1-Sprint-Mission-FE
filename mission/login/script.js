import * as lgn from "/Lib/public.js"

const user_email = document.querySelector('#login_email'); 
const user_password = document.querySelector('#login_password');
const togglePassword = document.querySelector(".password-toggle-icon i");
const login_button = document.querySelector('.login_box');
const modal_button = document.querySelector('.modal_button');


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
user_email.addEventListener('keyup', (e) => {
    lgn.login_focus_doing(e, user_email, user_password, login_button);
});
user_password.addEventListener('keyup', (e) => {
    lgn.login_focus_doing(e, user_email, user_password, login_button);
});

// // 로그인 버튼 활성화
const [box, box_activate, box_no_activate] = ['login_box', 'login_box_activate', 'login_box_no_activate'];

user_email.addEventListener('focusout', () => 
    {lgn.login_activat(box, box_activate, box_no_activate, user_email, user_password);
});
user_email.addEventListener('keyup', () => 
    {lgn.login_activat(box, box_activate, box_no_activate, user_email, user_password);
});
user_password.addEventListener('focusout', () => 
    {lgn.login_activat(box, box_activate, box_no_activate, user_email, user_password);
});
user_password.addEventListener('keyup', () => 
    {lgn.login_activat(box, box_activate, box_no_activate, user_email, user_password);
});

// // 로그인
login_button.addEventListener('click', () => {
    lgn.login(user_email, user_password, login_button);
});

// // 모달창 닫기
modal_button.addEventListener('click', lgn.modal_close);