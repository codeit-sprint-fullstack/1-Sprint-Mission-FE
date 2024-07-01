const passwordField = document.getElementById("login_password");
// document.getElementById는 JavaScript에서 DOM(Document Object Model)을 사용하여 HTML 요소를 가져오는 메서드로 id가 "login_password"에 해당하는 단일 HTML 요소를 반환
const togglePassword = document.querySelector(".password-toggle-icon i");
// document.querySelector는 주어진 CSS 선택자에 해당하는 첫 번째 문서 객체 모델(DOM) 요소를 반환하는 JavaScript 메서드로 password-toggle-icon i에 해당하는 <i> 요소를 가져온다.

togglePassword.addEventListener("click", function () {
  //togglePassword 요소에 클릭 이벤트 리스너를 추가합니다. 사용자가 아이콘을 클릭할 때마다 함수가 실행
  if (passwordField.type === "password") {
    //passwordField의 타입이 password일 때
    passwordField.type = "text";
    //passwordField의 타입을 text로 재지정
    togglePassword.classList.remove("fa-eye");
    //togglePassword 아이콘의 클래스에서 "fa-eye" 클래스를 제거
    togglePassword.classList.add("fa-eye-slash");
    //togglePassword 아이콘의 클래스에 "fa-eye-slash" 클래스 추가
  } else {
    passwordField.type = "password";
    // 그외 조건에 맞는게 없으면 passwordField의 타입을 password로 재지정
    togglePassword.classList.remove("fa-eye-slash");
    //togglePassword 아이콘의 클래스에서 "fa-eye-slash" 클래스를 제거
    togglePassword.classList.add("fa-eye");
    //togglePassword 아이콘의 클래스에 "fa-eye" 클래스 추가
  }
});
