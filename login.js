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


