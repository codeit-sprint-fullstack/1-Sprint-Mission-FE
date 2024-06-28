document.querySelector('.pw-show').addEventListener('click', function() {
  var password = document.getElementById('password');
  var passwordType = password.getAttribute('type');
  
  if (passwordType === 'password') {
    password.setAttribute('type', 'text');
  } else {
    password.setAttribute('type', 'password');
  }
});

document.querySelector('.pw-show-repeat').addEventListener('click', function() {
  var password = document.getElementById('password-repeat');
  var passwordType = password.getAttribute('type');
  
  if (passwordType === 'password') {
    password.setAttribute('type', 'text');
  } else {
    password.setAttribute('type', 'password');
  }
});