import { lengthTest, emailTest, pwTest, compareFunc } from './globe.js';
import { checkValueForBtn, checkModule } from './globe.js';

const emailEenterBox = document.querySelector('#email-enter-box');
const emailInput2 = emailEenterBox.querySelector('#id');

const nicknameBox = document.querySelector('#nickname-enter-box');
const nicknameInput = nicknameBox.querySelector('#nickname');

const pwEnterBox = document.querySelector('#pw-enter-box');
const pwlInput = pwEnterBox.querySelector('#pw');

const pwTestEnterBox = document.querySelector('#pw-test-enter-box');
const pwTestInput = pwTestEnterBox.querySelector('#pw-test');

const signUpBtn = document.querySelector('#sign-up-button')

const checkEmail = e => {
    checkModule(e, emailEenterBox, emailInput2);
    checkValueForBtn(signUpBtn, emailInput2, pwlInput, pwTestInput, nicknameInput)
}

const checkNickname = e => {
    checkModule(e, nicknameBox, nicknameInput);
    checkValueForBtn(signUpBtn, emailInput2, pwlInput, pwTestInput, nicknameInput)
}

const checkPassword = e => {
    checkModule(e, pwEnterBox, pwlInput);
    checkValueForBtn(signUpBtn, emailInput2, pwlInput, pwTestInput, nicknameInput)
}

const checkComparePassword = e => {
    checkModule(e, pwTestEnterBox, pwTestInput, pwlInput);
    checkValueForBtn(signUpBtn, emailInput2, pwlInput, pwTestInput, nicknameInput)
}

const test = e => {
    console.log('실행됨')
}


emailInput2.addEventListener('focusout', test) // 테스트

emailInput2.addEventListener('focusout', checkEmail)
nicknameInput.addEventListener('focusout', checkNickname)
pwlInput.addEventListener('focusout', checkPassword)
pwTestInput.addEventListener('focusout', checkComparePassword)


