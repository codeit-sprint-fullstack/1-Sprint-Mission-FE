import * as snp from '../Lib/public.js'

const user_email = document.querySelector('#signup_email');
const user_name = document.querySelector('#user_name');
const user_password = document.querySelector('#signup_password');
const togglePassword = document.querySelector(".password-toggle-icon i");
const user_password_check = document.querySelector('#signup_password_check');
const togglePassword_check = document.querySelector(".password-toggle-icon_check i");
const signup_button = document.querySelector('.signup_box');
const modal_button = document.querySelector('.modal_button');


// password 토글 
togglePassword.addEventListener('click', () => {
    snp.toggle_icon(user_password, togglePassword);
});
togglePassword_check.addEventListener('click', () => {
    snp.toggle_icon_check(user_password_check, togglePassword_check);
});

// error 메세지
user_email.addEventListener('focusout', () => 
    {snp.error_email(user_email);
});
user_email.addEventListener('keyup', () => {
    snp.error_keydown_email(user_email);
});
user_name.addEventListener('focusout', () => {
    snp.error_name(user_name);
});
user_name.addEventListener('keyup', () => {
    snp.error_keydown_name(user_name);
});
user_password.addEventListener('focusout', () => {
    snp.error_password(user_password);
});
user_password.addEventListener('keyup', () => {
    snp.error_keydown_password(user_password);
});
user_password_check.addEventListener('focusout', () => {
    snp.error_password_check(user_password_check, user_password);
});
user_password_check.addEventListener('keyup', () => {
    snp.error_keydown_password_check(user_password_check, user_password);
});

// enter로 focus 이동
user_email.addEventListener('keyup', (e) => {
    snp.signup_focus_doing(e, user_email, user_name, user_password, user_password_check, signup_button);
});
user_name.addEventListener('keyup', (e) => {
    snp.signup_focus_doing(e, user_email, user_name, user_password, user_password_check, signup_button);
});
user_password.addEventListener('keyup', (e) => {
    snp.signup_focus_doing(e, user_email, user_name, user_password, user_password_check, signup_button);
});
user_password_check.addEventListener('keyup', (e) => {
    snp.signup_focus_doing(e, user_email, user_name, user_password, user_password_check, signup_button);
});

// 회원가입 버튼 활성화
const [box, box_activate, box_no_activate] = ['signup_box', 'signup_box_activate', 'signup_box_no_activate'];

user_email.addEventListener('focusout', () => 
    {snp.signup_activat(box, box_activate, box_no_activate, user_email, user_name, user_password, user_password_check);
});
user_email.addEventListener('keyup', () => 
    {snp.signup_activat(box, box_activate, box_no_activate, user_email, user_name, user_password, user_password_check);
});
user_name.addEventListener('focusout', () => 
    {snp.signup_activat(box, box_activate, box_no_activate, user_email, user_name, user_password, user_password_check);
});
user_name.addEventListener('keyup', () => 
    {snp.signup_activat(box, box_activate, box_no_activate, user_email, user_name, user_password, user_password_check);
});
user_password.addEventListener('focusout', () => 
    {snp.signup_activat(box, box_activate, box_no_activate, user_email, user_name, user_password, user_password_check);
});
user_password.addEventListener('keyup', () => 
    {snp.signup_activat(box, box_activate, box_no_activate, user_email, user_name, user_password, user_password_check);
});
user_password_check.addEventListener('focusout', () => 
    {snp.signup_activat(box, box_activate, box_no_activate, user_email, user_name, user_password, user_password_check);
});
user_password_check.addEventListener('keyup', () => 
    {snp.signup_activat(box, box_activate, box_no_activate, user_email, user_name, user_password, user_password_check);
});

// 회원가입
signup_button.addEventListener('click', () => {
    snp.signup(user_email, user_password, signup_button);
});

// 모달창 닫기
modal_button.addEventListener('click', snp.modal_close);

