const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

export function checkFormat(value, type, confirm) {
    let errorMessage = ''
    switch (type) {
        case 'email':
            if (value.length === 0) {
                return errorMessage = '이메일을 입력해주세요.';
            } else if (!email_regex.test(value)) {
                return errorMessage = '잘못된 이메일 형식입니다.';
            } else {
                return errorMessage = undefined;
            }
            break;
        case 'name':
            if (value.length === 0) {
                return errorMessage = '닉네임을 입력해주세요.';
            } else {
                return errorMessage = undefined;
            }
            break;
        case 'pwd':
            if (value.length === 0) {
                return errorMessage = '비밀번호를 입력해주세요.';
            } else if (!pwdRegex.test(value)) {
                return errorMessage = '비밀번호는 특수문자 + 영문 + 숫자 입니다.';
            } else {
                return errorMessage = undefined;
            }
            break;
        case 'pwdconfirm':
            if (value.length === 0) {
                return errorMessage = '비밀번호를 한 번 더 입력해 주세요';
            } else if (value !== confirm) {
                return errorMessage = '비밀번호가 일치하지 않습니다.';
            } else {
                return errorMessage = undefined;
            }
            break;
    }

}

export function renderValidation(inputEl, type, confirm = '') {
    //메시지 표시 요소
    const errorTextEl = inputEl.parentElement.querySelector(".err");

    //type별 유효성검사
    const validationError = checkFormat(inputEl.value, type, confirm);

    if (validationError) {
        errorTextEl.textContent = validationError;
        // Red Label
        errorTextEl.classList.remove('hide');
        errorTextEl.classList.add("meg");
        inputEl.style.borderStyle = 'solid';
        inputEl.style.borderColor = '#F74747';
    } else {
        errorTextEl.classList.add('hide');
        errorTextEl.classList.remove('meg');
        inputEl.style.borderStyle = 'none';
    }
}

//btn disabled
export function inputDisabledBtn(meg, input) {
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
    { email: 'owootak@naver.com', password: "qwer!@#$1234" },
];