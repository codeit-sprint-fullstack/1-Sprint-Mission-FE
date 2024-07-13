
   // import USER_DATA from "/javascript/USER_DATA";
   
   /* 이메일/비밀번호 데이터 베이스 */
   const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
    ];

    /* 모달로 에러 메시지 구현 */
    var modal = document.getElementById("myModal");
    var confirmBtn = document.getElementById("confirm"); // 확인 버튼

    confirmBtn.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none"; // 화면표시 안됨
      }
    }
    
    function showModal(message) {
        document.getElementById('message').innerText = message;
        modal.style.display = "flex"; // 모달 창 표시
    }

    /* 데이터베이스에 있는 이메일/비밀번호인지 확인(가입되어 있는지) */
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      /* 데이터베이스에서 이메일을 이용해서 가입되어있는지 찾는다 */ 
      const foundUser = USER_DATA.find( function founduser(user){ 
        return user.email === email; 
      });
  
      if (!foundUser) { // 이메일로 사용자를 못 찾는 경우
        showModal("가입되지 않은 이메일입니다.");
      } else if (foundUser.password !== password) { // 이메일은 존재하지만, 비밀번호가 틀린 경우
        showModal("비밀번호가 일치하지않습니다.");
      } else {
        showModal("로그인에 성공했습니다!");
        setTimeout(function(){
            modal.style.display = "none";
        window.location.replace('/items'); // 로그인 성공시, 페이지 이동
      }, 2000)}
    });

    /* 이메일 input에서 focus out할 때 */
     document.getElementById('email').addEventListener('focusout', function(event) {
      const emailRegex = /^\S+@\S+\.\S+$/; // 유효한 이메일 양식

      const email = event.target;
    
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

    /* 비밀번호 input에서 focus out할 때 */
     document.getElementById('password').addEventListener('focusout', function(event) {
      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*])/; //.{8,}

      const password = event.target;

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

    /* input에 유효한 값 입력시, 로그인 버튼 활성화 */
    function validateEmail(email){ // 입력값 변경 시, 이메일 유효성 검사 수행 
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(email);
    }

    function validatePassword(password) { // 입력값 변경 시, 비밀번호 유효성 검사 수행 
      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*])/;
      return passwordRegex.test(password);
    }

    function validateForm() {
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const submit = document.getElementById('button');

      if(!validateEmail(email.value) || !validatePassword(password.value)) { // input값이 유효한지 확인
          submit.disabled = true; // 로그인 버튼 비활성화
      } else {
          submit.disabled = false; // 로그인 버튼 활성화
      }
    }
    /* 로그인 버튼 활성화 이벤트 */
    document.getElementById('email').addEventListener('input', validateForm);
    document.getElementById('password').addEventListener('input', validateForm);


