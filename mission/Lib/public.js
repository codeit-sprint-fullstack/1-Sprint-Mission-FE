import { USER_DATA } from "./user_data.js";

// 이메일 확인 변수
const email_text =  /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

// password eyes icon toggle의 if문 내용
const toggle_icon_if_body = (user_password, togglePassword) => {
    user_password.type = "text";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
}

// password eyes icon toggle의 else문 내용
const toggle_icon_else_body = (user_password, togglePassword) => {
    user_password.type = "password";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
}

// password eyes icon toggle
export const toggle_icon = (user_password, togglePassword) => {
    if (user_password.type === "password") {
        toggle_icon_if_body(user_password, togglePassword);
    
    } else {
        toggle_icon_else_body(user_password, togglePassword);
    }
}

// password_check eyes icon toggle
export const toggle_icon_check = (user_password_check, togglePassword_check) => {
    if (user_password_check.type === "password") {
        toggle_icon_if_body(user_password_check, togglePassword_check);

    } else {
        toggle_icon_else_body(user_password_check, togglePassword_check);
    }
}

// 모달창 버튼 포커스
const modal_focus = (modal_button) => modal_button.focus()

// 모달창 닫기
export const modal_close = () => {
    const modal = document.querySelector('.modal');
    modal.className = 'modal_none';
}
//email 에러
export const error_email = (user_email) => {

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

// 키보드에 의한 email 에러 제거 
export const error_keydown_email = (user_email) => {

    if (email_text.test(user_email.value) === true &&
        (user_email.nextElementSibling.textContent === '이메일을 입력해주세요.' || user_email.nextElementSibling.textContent === '잘못된 이메일 형식입니다.')) {

            user_email.classList.remove('input_less');
            user_email.nextElementSibling.remove();
            activat();
    }
}

// password 에러
export const error_password = (user_password) => {
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

// 키보드에 의한 password 에러 제거
export const error_keydown_password = (user_password) => {
    const error_massage_icon = document.querySelector('.icon_box');

    if (user_password.value.length >= 8 &&
        (error_massage_icon.nextElementSibling.textContent === '비밀번호를 입력해주세요.' || error_massage_icon.nextElementSibling.textContent === '비밀번호를 8자 이상 입력해주세요.')) {
            
            user_password.classList.remove('input_less');
            error_massage_icon.nextElementSibling.remove();
        }
} 

// 비공용 -----------------------------------

// 회원가입
export const signup = (user_email, user_password, signup_button) => {
    const signup_button_list = Array.from(signup_button.classList);
    const modal = document.querySelector('.modal_none');
    const modal_button = document.querySelector('.modal_button');

    if (signup_button_list.find((e) => e === 'signup_box_activate')) {

        if (USER_DATA.find((e) => e.email === user_email.value)) {

            modal.className = 'modal';
            setTimeout(() => {modal_focus(modal_button)}, 100);

        } else {
            const new_data = {};
            new_data.email = user_email.value;
            new_data.password = user_password.value;
            USER_DATA.push(new_data);
            window.location.href = '/login';

        }     
    }
}

// 로그인
export const login = (user_email, user_password, login_button) => {

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

//회원가입, 로그인 버튼 활성화 if문 body
const activat_if_body = (box, box_activate) => {
    const signup_button = document.querySelector(`.${box}`);
    signup_button.className = box;
    signup_button.classList.add(box_activate);
}

//회원가입, 로그인 버튼 활성화 else문 body
const activat_else_body = (box, box_no_activate) => {
    const signup_button = document.querySelector(`.${box}`);
    signup_button.className = box;
    signup_button.classList.add(box_no_activate);
}

// 회원가입 버튼 활성화
export const signup_activat = (box, box_activate, box_no_activate, user_email, user_name, user_password, user_password_check) => {

    if (user_password.value.length >= 8 && user_password_check.value === user_password.value && user_name.value !== '' && email_text.test(user_email.value) === true ) {
        activat_if_body(box, box_activate);

    } else {
        activat_else_body(box, box_no_activate);
    }
}

// 로그인 버튼 활성화
export const login_activat = (box, box_activate, box_no_activate, user_email, user_password) => {

    if (user_password.value.length >= 8 && email_text.test(user_email.value) === true ) {
        activat_if_body(box, box_activate);

    } else {
        activat_else_body(box, box_no_activate);
    }
}

// password_check 에러
export const error_password_check = (user_password_check, user_password) => {
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

//키보드에 의한 password_check 에러 제거
export const error_keydown_password_check = (user_password_check, user_password) => {
    const error_massage_icon = document.querySelector('.icon_box_check');

    if (user_password_check.value === user_password.value &&
        (error_massage_icon.nextElementSibling.textContent === '비밀번호를 다시 입력해주세요.' || error_massage_icon.nextElementSibling.textContent === '비밀번호가 일치하지 않습니다.')) {
            
            user_password_check.classList.remove('input_less');
            error_massage_icon.nextElementSibling.remove();
        }
} 

// name 에러
export const error_name = (user_name) => {
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
export const error_keydown_name = (user_name) => {
    if (user_name.value !== '' && user_name.nextElementSibling.textContent === '닉네임을 입력해주세요.') {

        user_name.classList.remove('input_less');
        user_name.nextElementSibling.remove();
        activat();
    }
}

// login page enter key의 focus 이동
export const login_focus_doing = (e, user_email, user_password, login_button) => {
    if (e.key === 'Enter' && document.activeElement === user_email) {
        user_password.focus();

    } else if (e.key === 'Enter' && document.activeElement === user_password) {
        login_button.focus();
        setTimeout(login, 100);
    }
}

// signup page enter key의 focus 이동
export const signup_focus_doing = (e, user_email, user_name, user_password, user_password_check, signup_button) => {

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