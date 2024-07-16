export const emailTest = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
export const lengthTest = text => text.length > 0;
export const pwTest = pw => pw.length >= 8;
export const compareFunc = (pw, pw2) => pw === pw2

export const checkValueForBtn = (targetBtn, id, pw, pwCompare, nickname) => {
    if (id && pw && !pwCompare && !nickname) {
        if (emailTest(id.value) && pwTest(pw.value)) {
            targetBtn.style.backgroundColor = '#3692FF';
        }
        else {
            targetBtn.style.backgroundColor = '#9CA3AF';
        }
    } else if (id && pw && pwCompare && nickname){
        if (emailTest(id.value) && pwTest(pw.value) && compareFunc(pw.value, pwCompare.value) && lengthTest(nickname.value)) {
                targetBtn.style.backgroundColor = '#3692FF';
                console.log('색상 변경')
        }
        else {
            targetBtn.style.backgroundColor = '#9CA3AF';
        }
    }
}

export const checkModule = function (e, enterBox, input, compareinput) {
    const message = enterBox.querySelector('span');
    switch (input.id) {
        case 'id':
            if (!lengthTest(input.value)) {
                input.style.borderColor = '#F74747';
                message.textContent = '이메일을 입력해주세요';
                message.style.display = 'inline';
            } else if (!emailTest(input.value)) {
                input.style.borderColor = '#F74747';
                message.textContent = '잘못된 이메일 형식입니다.'
                message.style.display = 'inline'
            } else {
                input.style.borderColor = '#FFFFFF';
                message.textContent = ''
            };
            console.log('이메일 체크 실행됨')
            break;

        case 'pw':
            if (!lengthTest(input.value)) {
                input.style.borderColor = '#F74747';
                message.textContent = '비밀번호를 입력해주세요';
                message.style.display = 'inline';
            } else if (!pwTest(input.value)) {
                input.style.borderColor = '#F74747';
                message.textContent = '비밀번호를 8자 이상 입력해주세요.'
                message.style.display = 'inline'
            } else {
                input.style.borderColor = '#FFFFFF';
                message.textContent = ''
            }
            console.log('비밀번호 체크 실행됨')
            break;

        case 'pw-test':
            if (!lengthTest(input.value)) {
                input.style.borderColor = '#F74747';
                message.textContent = '비밀번호를 한번 더 입력해주세요';
                message.style.display = 'inline';
            } else if (!compareFunc(input.value, compareinput.value)) {
                input.style.borderColor = '#F74747';
                message.textContent = '비밀번호가 일치하지 않습니다.'
                message.style.display = 'inline'
            } else {
                input.style.borderColor = '#FFFFFF';
                message.textContent = ''
            }
            console.log('비밀번호 재확인 체크 실행됨')
            break;

        case 'nickname':
            if (!lengthTest(input.value)) {
                input.style.borderColor = '#F74747';
                message.textContent = '닉네임을 입력해주세요';
                message.style.display = 'inline';
            } else {
                input.style.borderColor = '#FFFFFF';
                message.textContent = ''
            }
            console.log('닉네임 체크 실행됨')
            break;
    }
}

// emailInput.addEventListener('focusout', e => checkModule(e,emailBox))




// const checkLogin = (keyValueId, keyValuePw, value = true, value4 = true, targetBtn) => {

//     if (keyValue1 && keyValue2 && value3 && value4)
//     if(emailInput.value && pwlInput.value) {
//         if (emailTest(emailInput.value) && !pwTest(pwlInput.value)) {
//             loginBtn.style.backgroundColor = '#3692FF';
//         }
//         else {
//             loginBtn.style.backgroundColor = '#9CA3AF';
//         }
//     }
//     console.log('로그인 검사 실행됨')
// }

// const checkEmail = function(e) {
//     const errorMessage = emailBox.querySelector('span');

//     if (!emailInput.value) {
//         emailInput.style.borderColor = '#F74747';
//         errorMessage.textContent = '이메일을 입력해주세요';
//         errorMessage.style.display = 'inline';
//     } else if (!emailTest(emailInput.value)) {
//         emailInput.style.borderColor = '#F74747';
//         errorMessage.textContent = '잘못된 이메일 형식입니다.'
//         errorMessage.style.display = 'inline'
//     } else {
//         emailInput.style.borderColor = '#FFFFFF';
//         errorMessage.textContent = ''

//     }
//     console.log('이메일 체크 실행됨')
//     checkLogin()
// }

// const checkPassword = e => {
//     const errorMessage = pwBox.querySelector('span');

//     if (!pwlInput.value) {
//         pwlInput.style.borderColor = '#F74747';
//         errorMessage.textContent = '비밀번호를 입력해주세요';
//         errorMessage.style.display = 'inline';
//     } else if (pwTest(pwlInput.value)) {
//         pwlInput.style.borderColor = '#F74747';
//         errorMessage.textContent = '비밀번호를 8자 이상 입력해주세요.'
//         errorMessage.style.display = 'inline'
//     } else {
//         pwlInput.style.borderColor = '#FFFFFF';
//         errorMessage.textContent = ''
//     }
//     console.log('비밀번호 체크 실행됨')
//     checkLogin()
// }
// const checkEmail = function(e, article, inputBox) {
//     const errorMessage = article.querySelector('span');

//     if (!inputBox.value) {
//         inputBox.style.borderColor = '#F74747';
//         errorMessage.textContent = '이메일을 입력해주세요';
//         errorMessage.style.display = 'inline';
//     } else if (!isItEmail(inputBox.value)) {
//         inputBox.style.borderColor = '#F74747';
//         errorMessage.textContent = '잘못된 이메일 형식입니다.'
//         errorMessage.style.display = 'inline'
//     } else {
//         inputBox.style.borderColor = '#FFFFFF';
//         errorMessage.style.display = 'none'

//     }
//     console.log('이메일 체크 실행됨')
//     checkLogin()
// }

// emailInput.addEventListener('focusout', e => checkEmail(e, emailBox,emailInput))



// export {checkEmail, checkPassword}