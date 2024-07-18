// 이메일 확인 변수
const email_text =  /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

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

// 키보드에 의한 email 에러 제거(작성중 조건에 맞을 때)
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

// 키보드에 의한 password 에러 제거(작성중 조건에 맞을 때)
export const error_keydown_password = (user_password) => {
    const error_massage_icon = document.querySelector('.icon_box');

    if (user_password.value.length >= 8 &&
        (error_massage_icon.nextElementSibling.textContent === '비밀번호를 입력해주세요.' || error_massage_icon.nextElementSibling.textContent === '비밀번호를 8자 이상 입력해주세요.')) {
            
            user_password.classList.remove('input_less');
            error_massage_icon.nextElementSibling.remove();
        }
} 

// password eyes icon toggle
export const toggle_icon = (user_password, togglePassword) => {
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

// 모달창 버튼 포커스
export const modal_focus = (modal_button) => modal_button.focus()

// 모달창 닫기
export const modal_close = () => {
    const modal = document.querySelector('.modal');
    modal.className = 'modal_none';
}