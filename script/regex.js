const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

export function emailRegex (e) {
    const err = e.target.parentElement.nextElementSibling;

    if(!e.target.value) {
        err.textContent = '이메일을 입력해주세요.';
        err.classList.remove('hide');
        e.target.style.borderColor = '#F74747';
        e.target.style.borderStyle = 'solid';
    } else if(!email_regex.test(e.target.value)) {
        err.textContent = '잘못된 이메일 형식입니다.';
        err.classList.remove('hide');
        e.target.style.borderColor = '#F74747';
        e.target.style.borderStyle = 'solid';
    } else {
        err.classList.add('hide');
        e.target.style.borderStyle = 'none';
    }
}

export function passwordRegex (e) {
    const err = e.target.parentElement.nextElementSibling;

    if(!e.target.value) {
        err.textContent = '비밀번호를 입력해주세요.';
        err.classList.remove('hide');
        e.target.style.borderColor = '#F74747';
        e.target.style.borderStyle = 'solid';
    } else if(e.target.value.length < 8) {
        err.textContent = '비밀번호를 8자 이상 입력해주세요.';
        err.classList.remove('hide');
        e.target.style.borderColor = '#F74747';
        e.target.style.borderStyle = 'solid';
    } else {
        err.classList.add('hide');
        e.target.style.borderStyle = 'none';
    }
}