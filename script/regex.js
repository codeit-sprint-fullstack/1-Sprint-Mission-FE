const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

export function emailRegex(e) {
    const err = e.target.parentElement.nextElementSibling;
    if (!e.target.value) {
        err.textContent = '이메일을 입력해주세요.';
        err.classList.remove('hide');
        err.classList.add("meg");
        e.target.style.borderStyle = 'solid';
        e.target.style.borderColor = '#F74747';
    } else if (!email_regex.test(e.target.value)) {
        err.textContent = '잘못된 이메일 형식입니다.';
        err.classList.remove('hide');
        err.classList.add("meg");
        e.target.style.borderStyle = 'solid';
        e.target.style.borderColor = '#F74747';
    } else {
        err.classList.add('hide');
        err.classList.remove('meg');
        e.target.style.borderStyle = 'none';
    }
}

export function nameRegex(e) {
    const err = e.target.parentElement.nextElementSibling;

    if (!e.target.value) {
        err.textContent = '닉네임을 입력해주세요.';
        err.classList.remove('hide');
        err.classList.add("meg");
        e.target.style.borderStyle = 'solid';
        e.target.style.borderColor = '#F74747';
    } else {
        err.classList.add('hide');
        err.classList.remove('meg');
        e.target.style.borderStyle = 'none';
    }
}

export function passwordRegex(e) {
    const err = e.target.parentElement.nextElementSibling;

    if (!e.target.value) {
        err.textContent = '비밀번호를 입력해주세요.';
        err.classList.remove('hide');
        err.classList.add("meg");
        e.target.style.borderColor = '#F74747';
        e.target.style.borderStyle = 'solid';
    } else if (!pwdRegex.test(e.target.value)) {
        err.textContent = '비밀번호는 특수문자 + 영문 + 숫자 입니다.';
        err.classList.remove('hide');
        err.classList.add("meg");
        e.target.style.borderColor = '#F74747';
        e.target.style.borderStyle = 'solid';
    } else {
        err.classList.add('hide');
        err.classList.remove('meg');
        e.target.style.borderStyle = 'none';
    }
}

export function passwordConfirmRegex(e, pwd) {
    const err = e.target.parentElement.nextElementSibling;
    // console.log(pwd.value);
    if (!e.target.value) {
        err.textContent = '비밀번호를 입력해주세요.';
        err.classList.remove('hide');
        err.classList.add("meg");
        e.target.style.borderColor = '#F74747';
        e.target.style.borderStyle = 'solid';
    } else if (e.target.value !== pwd.value) {
        err.textContent = '비밀번호가 일치하지 않습니다.';
        err.classList.remove('hide');
        err.classList.add("meg");
        e.target.style.borderColor = '#F74747';
        e.target.style.borderStyle = 'solid';
    } else {
        err.classList.add('hide');
        err.classList.remove('meg');
        e.target.style.borderStyle = 'none';
    }
}

export function inputDisabledBtn(meg, input) {
    // console.log(meg);
    if (meg.length > 0) {
        return false;
    } else {
        const check = Array.from(input).some((val) => {
            return val.value.length === 0;
        });
        if (check) {
            return false;
        } else {
            return true;
        }
    }
}

export const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];