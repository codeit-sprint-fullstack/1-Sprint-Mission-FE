
const enterFullBox = document.querySelector('#main-enter-box');
const enterBoxList = enterFullBox.querySelectorAll('.enter-box');
const emailBox = enterBoxList[0];
const pwBox = enterBoxList[1];
const emailInput = emailBox.querySelector('#id');
const pwInput = pwBox.querySelector('#pw');

const checkEmail = function(e) {
    const emailInput = emailBox.querySelector('#id');
    const errorMessage = emailBox.querySelector('.show-instant-message');
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const checkInput = (Stringvalue) => re.test(String(Stringvalue).toLowerCase());
 
    const showMessage = function (message) {
        emailInput.classList.toggle('input-error-outline');
        const messageSpan = document.createElement('span');
        messageSpan.classList.add('show-instant-message');
        messageSpan.textContent = message;
        emailBox.appendChild(messageSpan);
    };

    if (!emailInput.value) {
        showMessage('이메일을 입력해주세요');
    } else {
        if (errorMessage) {
            emailInput.classList.toggle('input-error-outline');
            errorMessage.remove();
        }
        if (!checkInput(emailInput.value)) {
            showMessage('잘못된 이메일 형식입니다');
        }
    }
};


emailInput.addEventListener('focusout', checkEmail)

