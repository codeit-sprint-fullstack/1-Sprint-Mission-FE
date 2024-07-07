
   /* 이메일/비밀번호 데이터 베이스 */
   const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
    ];

    /* 데이터베이스에 있는 이메일/비밀번호인지 확인(가입되어 있는지) */
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      /* 데이터베이스에서 이메일을 이용해서 가입되어있는지 찾는다 */ 
      let foundUser = USER_DATA.find( function founduser(user){ 
        return user.email === email; 
      });
  
      if (!foundUser) { // 이메일로 사용자를 못 찾는 경우
        alert("가입되지 않은 이메일입니다.");
      } else if (foundUser.password !== password) { // 이메일은 존재하지만, 비밀번호가 틀린 경우
        alert("비밀번호가 일치하지않습니다.");
      } else {
        alert("로그인에 성공했습니다!");
        window.location.replace('/items'); // 로그인 성공시, 페이지 이동
      }
    });