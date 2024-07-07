/* 이메일/비밀번호 데이터 베이스 */
const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
    ];

/* 데이터베이스에 있는 이메일/비밀번호 인지 확인 */
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    /* 이메일과 비밀번호 입력받음 */
    const email = document.getElementById('email').value;

    /* 데이터베이스에서 이메일을 이용해서 사용자를 찾는다 */ 
    let foundUser = USER_DATA.find(function founduser(user){ 
      return user.email === email; 
    });

    if (foundUser) { // 이미 데이터베이스에 있는 이메일인 경우
      alert("사용중인 이메일입니다.");
    } else {
      alert("회원가입에 성공했습니다!");
      window.location.replace('/login');
    }
  });

  /* 이메일 input에서 focus out할 때 */
 document.getElementById('email').addEventListener('focusout', function emailFocusout(event) {
    var emailRegex = /^\S+@\S+\.\S+$/; // 유효한 이메일 양식

    var email = event.target;
    
    if (email.value === '') { // 이메일 값이 없을 경우
        email.classList.add('error');
        document.getElementById('emailerror').innerHTML = '이메일을 입력해주세요.';
        document.getElementById('emailerror').hidden = false;
    }else if(!emailRegex.test(email.value)){ // 입력한 이메일이 형식에 맞지않는 경우
      email.classList.add('error');
      document.getElementById('emailerror').innerHTML = '잘못된 이메일 형식입니다.';
      document.getElementById('emailerror').hidden = false;
    }else{
        email.classList.remove('error');
        document.getElementById('emailerror').hidden = true;
    }
});
     
