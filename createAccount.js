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

/* 닉네임 input에서 focus out할 때 */
document.getElementById('name').addEventListener('focusout', function(event) {
    const nameRegex = /^[가-힣]+$/; // 닉네임은 한글로만 작성 가능
    const name = event.target;
  
    if (name.value === '') { // 닉네임 값이 없을 경우
        name.classList.add('error');
        document.getElementById('nameerror').innerHTML = '닉네임을 입력해주세요.';
        document.getElementById('nameerror').hidden = false;
    } else if(!nameRegex.test(name.value)){ // 닉네임 값이 형식에 맞지 않는 경우
      name.classList.add('error');
      document.getElementById('nameerror').innerHTML = '닉네임은 한글로만 작성해주세요.';
      document.getElementById('nameerror').hidden = false;
    }else{
      name.classList.remove('error');
      document.getElementById('nameerror').hidden = true;
    }
  });

/* 비밀번호 input에서 focus out할 때 */
document.getElementById('password').addEventListener('focusout', function(event) {
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*])/;
  
    var password = event.target;
  
    if (password.value === '') { // 비밀번호 값이 없을 경우
        password.classList.add('error');
        document.getElementById('passworderror').innerHTML = '비밀번호를 입력해주세요.';
        document.getElementById('passworderror').hidden = false;
    } else if(!passwordRegex.test(password.value)){ // 비밀번호가 형식에 맞지 않는 경우
      password.classList.add('error');
      document.getElementById('passworderror').innerHTML = '잘못된 비밀번호 형식입니다.';
      document.getElementById('passworderror').hidden = false;
    }else if(password.value.length < 8){ // 비밀번호 값이 8자 미만일 경우
      password.classList.add('error');
      document.getElementById('passworderror').innerHTML = '비밀번호를 8자 이상 입력해주세요.';
      document.getElementById('passworderror').hidden = false;
    }
    else {
        password.classList.remove('error');
        document.getElementById('passworderror').hidden = true;
    }
  });

/* 비밀번호 확인 input에서 focus out할 때 */
document.getElementById('passwordmaza').addEventListener('focusout', function(event) {
    const password = document.getElementById('password').value;
    const passwordconfirm = event.target.value;
    const ckpassword = event.target;
    
    if (passwordconfirm.value === '') { // 비밀번호 확인 값이 없을 경우
        passwordmaza.classList.add('error');
        document.getElementById('password_maza_error').innerHTML = '비밀번호를 다시 입력해주세요.';
        document.getElementById('password_maza_error').hidden = false;
    } else if(!checkpassword(password,passwordconfirm)){ // 비밀번호가 맞지 않는 경우
        passwordmaza.classList.add('error');
        document.getElementById('password_maza_error').innerHTML = '비밀번호가 맞지 않습니다.';
        document.getElementById('password_maza_error').hidden = false;
    }else {
        passwordmaza.classList.remove('error');
        document.getElementById('password_maza_error').hidden = true;
    }
    });

    
