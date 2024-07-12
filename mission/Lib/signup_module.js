import { USER_DATA } from "./user_data.js";

const user_email = document.querySelector('#signup_email');
const user_name = document.querySelector('#user_name');
const user_password = document.querySelector('#signup_password');
const togglePassword = document.querySelector(".password-toggle-icon i");
const user_password_check = document.querySelector('#signup_password_check');
const togglePassword_check = document.querySelector(".password-toggle-icon_check i");
const signup_button = document.querySelector('.signup_box');
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

// email 에러
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
// password 에러
const error_password = () => {
    const error_massage_icon = document.querySelector('.icon_box');

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

// 키보드에 의한 email 에러 제거 
const error_keydown_email = () => {
    const email_text =  /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (email_text.test(user_email.value) === true &&
        (user_email.nextElementSibling.textContent === '이메일을 입력해주세요.' || user_email.nextElementSibling.textContent === '잘못된 이메일 형식입니다.')) {

            user_email.classList.remove('input_less');
            user_email.nextElementSibling.remove();
            activat();
    }
}

// 키보드에 의한 password 에러 제거
const error_keydown_password = () => {
    const error_massage_icon = document.querySelector('.icon_box');

    if (user_password.value.length >= 8 &&
        (error_massage_icon.nextElementSibling.textContent === '비밀번호를 입력해주세요.' || error_massage_icon.nextElementSibling.textContent === '비밀번호를 8자 이상 입력해주세요.')) {
            
            user_password.classList.remove('input_less');
            error_massage_icon.nextElementSibling.remove();
        }
} 

//키보드에 의한 password_check 에러 제거
const error_keydown_password_check = () => {
    const error_massage_icon = document.querySelector('.icon_box_check');

    if (user_password_check.value === user_password.value &&
        (error_massage_icon.nextElementSibling.textContent === '비밀번호를 다시 입력해주세요.' || error_massage_icon.nextElementSibling.textContent === '비밀번호가 일치하지 않습니다.')) {
            
            user_password_check.classList.remove('input_less');
            error_massage_icon.nextElementSibling.remove();
        }
} 

// enter key의 focus 이동
const focus_doing = (e) => {
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

// 키보드에 의한 name 에러 제거
const error_keydown_name = () => {
    if (user_name.value !== '' && user_name.nextElementSibling.textContent === '닉네임을 입력해주세요.') {

        user_name.classList.remove('input_less');
        user_name.nextElementSibling.remove();
        activat();
    }
}

// 회원가입 버튼 활성화
const activat = () => {
    const email_text =  /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (user_password.value.length >= 8 && user_password_check.value === user_password.value && user_name.value !== '' && email_text.test(user_email.value) === true ) {

        const signup_button = document.querySelector('.signup_box');
        signup_button.className = 'signup_box';
        signup_button.classList.add('signup_box_activate');

    } else {
        const signup_button = document.querySelector('.signup_box');
        signup_button.className = 'signup_box';
        signup_button.classList.add('signup_box_no_activate');
    }
}

// 회원가입
const signup = () => {
    const signup_button_list = Array.from(signup_button.classList);
    const modal = document.querySelector('.modal_none');

    if (signup_button_list.find((e) => e === 'signup_box_activate')) {

        if (USER_DATA.find((e) => e.email === user_email.value)) {

            modal.className = 'modal';
            setTimeout(modal_focus, 100);

        } else {
            const new_data = {};
            new_data.email = user_email.value;
            new_data.password = user_password.value;
            USER_DATA.push(new_data);
            window.location.href = '/login';

        }     
    }
}

// 모달창 버튼 포커스
const modal_focus = () => modal_button.focus()

// 모달창 닫기
const modal_close = () => {
    const modal = document.querySelector('.modal');
    modal.className = 'modal_none';
}

export {user_email, user_name, user_password, user_password_check, signup_button, modal_button, togglePassword, togglePassword_check}
export {error_email, error_password, error_password_check, error_keydown_email, error_keydown_password, error_keydown_password_check, focus_doing, error_name, error_keydown_name, activat, signup, modal_close, toggle_icon, toggle_icon_check}