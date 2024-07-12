import { USER_DATA } from "./user_data.js";

const user_email = document.querySelector('#login_email'); 
const user_password = document.querySelector('#login_password');
const togglePassword = document.querySelector(".password-toggle-icon i");
const login_button = document.querySelector('.login_box');
const modal_button = document.querySelector('.modal_button');

// password eyes icon toggle
const toggle_icon = () => {
    if (user_password.type === "password") {

        user_password.type = "text";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    
    } else {
        user_password.type = "password";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    }
}

// 로그인
const login = () => {

    const login_button_list = Array.from(login_button.classList);
    const modal = document.querySelector('.modal_none');

    if (login_button_list.find((e) => e === 'login_box_activate')) {
        if (USER_DATA.find((n) => n.email === user_email.value && n.password === user_password.value)) {
            window.location.href = '/items';
        } else {
            modal.className = 'modal';
            setTimeout(modal_focus, 100);
        }
    }
}

// 로그인 버튼 활성화
const activat = () => {
    const email_text =  /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (user_password.value.length >= 8 && email_text.test(user_email.value) === true ) {

        const login_button = document.querySelector('.login_box');
        login_button.className = 'login_box';
        login_button.classList.add('login_box_activate');

    } else {
        const login_button = document.querySelector('.login_box');
        login_button.className = 'login_box';
        login_button.classList.add('login_box_no_activate');
    }
}

// email 에러 (공용)
const error_email = () => {
    const email_text =  /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (user_email.value === "") {
        user_email.classList.add('input_less');

        if (user_email.nextElementSibling.textContent === '잘못된 이메일 형식입니다.') {
            user_email.nextElementSibling.textContent = '이메일을 입력해주세요.';

        } else if (user_email.nextElementSibling.textContent !== '이메일을 입력해주세요.'){
            const add_massage = document.createElement('p');
            add_massage.textContent = '이메일을 입력해주세요.';
            add_massage.classList.add('add_ms');
            user_email.after(add_massage);
        }

    } else if (email_text.test(user_email.value) === false) {
        user_email.classList.add('input_less');

        if (user_email.nextElementSibling.textContent === '이메일을 입력해주세요.') {
            user_email.nextElementSibling.textContent = '잘못된 이메일 형식입니다.';

        } else if (user_email.nextElementSibling.textContent !== '잘못된 이메일 형식입니다.'){
            const add_massage = document.createElement('p');
            add_massage.textContent = '잘못된 이메일 형식입니다.';
            add_massage.classList.add('add_ms');
            user_email.after(add_massage);
        }
    } else {
        user_email.classList.remove('input_less')
        if (user_email.nextElementSibling.textContent === '이메일을 입력해주세요.' || user_email.nextElementSibling.textContent === '잘못된 이메일 형식입니다.') {
            user_email.nextElementSibling.remove();
        } 
    }
}

// 키보드에 의한 email 에러 제거 (공용)
const error_keydown_email = () => {
    const email_text =  /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (email_text.test(user_email.value) === true &&
        (user_email.nextElementSibling.textContent === '이메일을 입력해주세요.' || user_email.nextElementSibling.textContent === '잘못된 이메일 형식입니다.')) {

            user_email.classList.remove('input_less');
            user_email.nextElementSibling.remove();
            activat();
    }
}

// password 에러
const error_password = () => {
    const error_massage_icon = document.querySelector('.icon');

    if (user_password.value === "") {
        user_password.classList.add('input_less');

        if (error_massage_icon.nextElementSibling.textContent === '비밀번호를 8자 이상 입력해주세요.') {
            error_massage_icon.nextElementSibling.textContent = '비밀번호를 입력해주세요.';

        } else if (error_massage_icon.nextElementSibling.textContent !== '비밀번호를 입력해주세요.') {
            const add_massage = document.createElement('p');
            add_massage.textContent = '비밀번호를 입력해주세요.';
            add_massage.classList.add('add_ms');
            error_massage_icon.after(add_massage);
        }

    } else if (user_password.value.length < 8){
        user_password.classList.add('input_less');

        if (error_massage_icon.nextElementSibling.textContent === '비밀번호를 입력해주세요.') {
            error_massage_icon.nextElementSibling.textContent = '비밀번호를 8자 이상 입력해주세요.';

        } else if (error_massage_icon.nextElementSibling.textContent !== '비밀번호를 8자 이상 입력해주세요.') {
            const add_massage = document.createElement('p');
            add_massage.textContent = '비밀번호를 8자 이상 입력해주세요.';
            add_massage.classList.add('add_ms');
            error_massage_icon.after(add_massage);
        }
            
    } else {
        user_password.classList.remove('input_less');
        if (error_massage_icon.nextElementSibling.textContent === '비밀번호를 입력해주세요.' || error_massage_icon.nextElementSibling.textContent === '비밀번호를 8자 이상 입력해주세요.') {
            error_massage_icon.nextElementSibling.remove();
        }
    }
        
}

// 키보드에 의한 password 에러 제거
const error_keydown_password = () => {
    const error_massage_icon = document.querySelector('.icon');

    if (user_password.value.length >= 8 &&
        (error_massage_icon.nextElementSibling.textContent === '비밀번호를 입력해주세요.' || error_massage_icon.nextElementSibling.textContent === '비밀번호를 8자 이상 입력해주세요.')) {
            
            user_password.classList.remove('input_less');
            error_massage_icon.nextElementSibling.remove();
        }
}

// enter key의 focus 이동
const focus_doing = (e) => {
    if (e.key === 'Enter' && document.activeElement === user_email) {
        user_password.focus();

    } else if (e.key === 'Enter' && document.activeElement === user_password) {
        login_button.focus();
        setTimeout(login, 100);
    }
}

// 모달창 버튼 포커스
const modal_focus = () => modal_button.focus()

// 모달창 닫기
const modal_close = () => {
    const modal = document.querySelector('.modal');
    modal.className = 'modal_none';
}

export {user_email, user_password, login_button, modal_button, togglePassword}
export {login, activat, error_email, error_keydown_email, error_password, error_keydown_password, focus_doing, modal_close, toggle_icon}