import { USER_DATA } from "/Lib/user_data.js";
import * as snp from '../Lib/public.js'

const user_email = document.querySelector('#signup_email');
const user_name = document.querySelector('#user_name');
const user_password = document.querySelector('#signup_password');
const togglePassword = document.querySelector(".password-toggle-icon i");
const user_password_check = document.querySelector('#signup_password_check');
const togglePassword_check = document.querySelector(".password-toggle-icon_check i");
const signup_button = document.querySelector('.signup_box');
const modal_button = document.querySelector('.modal_button');
const email_text =  /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

// -----------------------------------------------------------

// 회원가입
const signup = () => {
    const signup_button_list = Array.from(signup_button.classList);
    const modal = document.querySelector('.modal_none');

    if (signup_button_list.find((e) => e === 'signup_box_activate')) {

        if (USER_DATA.find((e) => e.email === user_email.value)) {

            modal.className = 'modal';
            setTimeout(() => {snp.modal_focus(modal_button)}, 100);

        } else {
            const new_data = {};
            new_data.email = user_email.value;
            new_data.password = user_password.value;
            USER_DATA.push(new_data);
            window.location.href = '/login';

        }     
    }
}

// 회원가입 버튼 활성화 
const signup_activat = () => {

    if (user_password.value.length >= 8 && user_password_check.value === user_password.value && user_name.value !== '' && email_text.test(user_email.value) === true ) {
        signup_button.className = 'signup_box';
        signup_button.classList.add('signup_box_activate');

    } else {
        signup_button.className = 'signup_box';
        signup_button.classList.add('signup_box_no_activate');
    }
}

// name 에러
const error_name = () => {
    if (user_name.value === "") {
        user_name.classList.add('input_less');

        if (user_name.nextElementSibling.textContent !== '닉네임을 입력해주세요.'){
            const add_massage = document.createElement('p');
            add_massage.textContent = '닉네임을 입력해주세요.';
            add_massage.classList.add('add_ms');
            user_name.after(add_massage);
        }

    } else {
            user_name.classList.remove('input_less')
            if (user_name.nextElementSibling.textContent === '닉네임을 입력해주세요.') {
                user_name.nextElementSibling.remove();
            } 
    }
}

// 키보드에 의한 name 에러 제거(작성중 조건에 맞을 때)
const error_keydown_name = () => {
    if (user_name.value !== '' && user_name.nextElementSibling.textContent === '닉네임을 입력해주세요.') {

        user_name.classList.remove('input_less');
        user_name.nextElementSibling.remove();
        activat();
    }
}

// password_check 에러
const error_password_check = () => {
    const error_massage_icon = document.querySelector('.icon_box_check');

    if (user_password_check.value === "") {
        user_password_check.classList.add('input_less');

        if (error_massage_icon.nextElementSibling.textContent === '비밀번호가 일치하지 않습니다.') {
            error_massage_icon.nextElementSibling.textContent = '비밀번호를 다시 입력해주세요.';

        } else if (error_massage_icon.nextElementSibling.textContent !== '비밀번호를 다시 입력해주세요.') {
            const add_massage = document.createElement('p');
            add_massage.textContent = '비밀번호를 다시 입력해주세요.';
            add_massage.classList.add('add_ms');
            error_massage_icon.after(add_massage);
        }

    } else if (user_password_check.value !== user_password.value){
        user_password_check.classList.add('input_less');

        if (error_massage_icon.nextElementSibling.textContent === '비밀번호를 다시 입력해주세요.') {
            error_massage_icon.nextElementSibling.textContent = '비밀번호가 일치하지 않습니다.';

        } else if (error_massage_icon.nextElementSibling.textContent !== '비밀번호가 일치하지 않습니다.') {
            const add_massage = document.createElement('p');
            add_massage.textContent = '비밀번호가 일치하지 않습니다.';
            add_massage.classList.add('add_ms');
            error_massage_icon.after(add_massage);
        }
            
    } else {
        user_password_check.classList.remove('input_less');
        if (error_massage_icon.nextElementSibling.textContent === '비밀번호를 다시 입력해주세요.' || error_massage_icon.nextElementSibling.textContent === '비밀번호가 일치하지 않습니다.') {
            error_massage_icon.nextElementSibling.remove();
        }
    }
        
}

//키보드에 의한 password_check 에러 제거(작성중 조건에 맞을 때)
const error_keydown_password_check = () => {
    const error_massage_icon = document.querySelector('.icon_box_check');

    if (user_password_check.value === user_password.value &&
        (error_massage_icon.nextElementSibling.textContent === '비밀번호를 다시 입력해주세요.' || error_massage_icon.nextElementSibling.textContent === '비밀번호가 일치하지 않습니다.')) {
            
            user_password_check.classList.remove('input_less');
            error_massage_icon.nextElementSibling.remove();
        }
} 

// password_check eyes icon toggle
const toggle_icon_check = () => {
    if (user_password_check.type === "password") {
        user_password_check.type = "text";
        togglePassword_check.classList.remove("fa-eye-slash");
        togglePassword_check.classList.add("fa-eye");

    } else {
        user_password_check.type = "password";
        togglePassword_check.classList.remove("fa-eye");
        togglePassword_check.classList.add("fa-eye-slash");
    }
}

// enter key의 focus 이동
const signup_focus_doing = (e) => {

    if (e.key === 'Enter' && document.activeElement === user_email) {
        user_name.focus();

    } else if (e.key === 'Enter' && document.activeElement === user_name) {
        user_password.focus();

    } else if (e.key === 'Enter' && document.activeElement === user_password) {
        user_password_check.focus();
        
    } else if (e.key === 'Enter' && document.activeElement === user_password_check) {
        signup_button.focus()
        setTimeout(signup, 100);
    }
}   

// -------------------------------------

// password 토글 
togglePassword.addEventListener('click', () => {
    snp.toggle_icon(user_password, togglePassword);
});
togglePassword_check.addEventListener('click', toggle_icon_check);

// email error 메세지
user_email.addEventListener('focusout', () => 
    {snp.error_email(user_email);
});
user_email.addEventListener('keyup', () => {
    snp.error_keydown_email(user_email);
});

// name error 메세지
user_name.addEventListener('focusout', error_name);
user_name.addEventListener('keyup', error_keydown_name);

// password error 메세지
user_password.addEventListener('focusout', () => {
    snp.error_password(user_password);
});
user_password.addEventListener('keyup', () => {
    snp.error_keydown_password(user_password);
});

// password_check error 메세지
user_password_check.addEventListener('focusout', error_password_check);
user_password_check.addEventListener('keyup', error_keydown_password_check);

// enter로 focus 이동
user_email.addEventListener('keyup', signup_focus_doing);
user_name.addEventListener('keyup', signup_focus_doing);
user_password.addEventListener('keyup', signup_focus_doing);
user_password_check.addEventListener('keyup', signup_focus_doing);

// 회원가입 버튼 활성화
user_email.addEventListener('focusout', signup_activat);
user_email.addEventListener('keyup', signup_activat);
user_name.addEventListener('focusout', signup_activat);
user_name.addEventListener('keyup', signup_activat);
user_password.addEventListener('focusout', signup_activat);
user_password.addEventListener('keyup', signup_activat);
user_password_check.addEventListener('focusout', signup_activat);
user_password_check.addEventListener('keyup', signup_activat);

// 회원가입
signup_button.addEventListener('click', signup);

// 모달창 닫기
modal_button.addEventListener('click', snp.modal_close);

