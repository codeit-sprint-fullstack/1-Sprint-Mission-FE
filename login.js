function showHide(b,a) {
   if (b.type === 'password') {
   b.setAttribute('type','text');
   a.setAttribute('src', 'img/eyeopen.png');
   } else {
   b.setAttribute('type', 'password');
   a.setAttribute('src', 'img/eyeclose.png');
 }
};

const password = document.querySelector('.password');
const passIcon = document.querySelector('.pass_icon');

passIcon.addEventListener('click', () => {showHide(password,passIcon)})








const email = document.getElementById('user-email');
const failureMessage = document.querySelector('.failure-message');
const failureMessageTwo = document.querySelector('.failure-message2');
const input = document.querySelector('input');

const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

email.addEventListener('focusout', () => {
  if (email.value === '') {
    failureMessage.classList.remove('hide');
    failureMessageTwo.classList.add('hide');
    input.classList.add('invalid-value');
    input.classList.remove('valid-value');
  } else if (!pattern.test(email.value)) {      
    failureMessage.classList.add('hide');
    failureMessageTwo.classList.remove('hide');
    input.classList.add('invalid-value');
    input.classList.remove('valid-value');
    } else {
      failureMessage.classList.add('hide');
      failureMessageTwo.classList.add('hide');
      input.classList.remove('invalid-value');
      input.classList.add('valid-value');
    }
  }
)


const failureMessageThree = document.querySelector('.failure-message3');
const failureMessageFour = document.querySelector('.failure-message4');

password.addEventListener('focusout', () => {
  if (password.value === '') {
    failureMessageThree.classList.remove('hide');
    failureMessageFour.classList.add('hide');
    password.classList.add('invalid-value');
    password.classList.remove('valid-value');
  } else if (password.value.length < 8) {
    failureMessageThree.classList.add('hide');
    failureMessageFour.classList.remove('hide');
    password.classList.add('invalid-value');
    password.classList.remove('valid-value');
    } else {
      failureMessageThree.classList.add('hide');
      failureMessageFour.classList.add('hide');
      password.classList.remove('invalid-value');
      password.classList.add('valid-value');
  }
})
 
  
