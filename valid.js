const email = document.getElementById('user-email');
const pw = document.querySelector('.password');
const failureMessage = document.querySelector('.failure-message')
const failureMessageTwo = document.querySelector('.failure-message2')



email.focusout = function () {
  if (email.value = '') {
    failureMessage.classList.remove('hide')
    failureMessageTwo.classList.add('hide')
  } else if (email.type !== 'email') {
    failureMessage.classList.add('hide')
    failureMessageTwo.classList.remove('hide')   
  }
}