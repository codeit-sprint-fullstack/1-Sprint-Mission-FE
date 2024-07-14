document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('#login-form');
  const signupForm = document.querySelector('#signup-form');

  const USER_DATA = [ 
    { email: 'codeit1@codeit.com', password: 'codeit101!' },
    { email: 'codeit2@codeit.com', password: 'codeit202!' },
    { email: 'codeit3@codeit.com', password: 'codeit303!' },
    { email: 'codeit4@codeit.com', password: 'codeit404!' },
    { email: 'codeit5@codeit.com', password: 'codeit505!' },
    { email: 'codeit6@codeit.com', password: 'codeit606!' }
  ];

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); 

      const email = loginForm.querySelector('#email').value;
      const password = loginForm.querySelector('#password').value;

      
      const user = USER_DATA.find(user => user.email === email);

      if (!user) {
        alert('이메일이 데이터베이스에 없습니다.');
      } else if (user.password !== password) {
        alert('비밀번호가 일치하지 않습니다.');
      } else {
        window.location.href = '/items'; 
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault(); // 기본 폼 제출 동작 방지

      const email = signupForm.querySelector('#email').value;
      const nickname = signupForm.querySelector('#nickname').value;
      const password = signupForm.querySelector('#password').value;
      const passwordConfirmation = signupForm.querySelector('#passwordConfirmation').value;

      // 이메일이 데이터베이스에 존재하는지 확인
      const userExists = USER_DATA.some(user => user.email === email);

      if (userExists) {
        alert('사용 중인 이메일입니다.');
      } else if (password !== passwordConfirmation) {
        alert('비밀번호가 일치하지 않습니다.');
      } else {
        USER_DATA.push({ email: email, nickname: nickname, password: password }); // 새로운 사용자 데이터 추가
        alert('회원가입이 성공적으로 처리되었습니다.');
        window.location.href = '/login'; // 회원가입 성공 후 로그인 페이지로 이동
      }
    });
  }
});
