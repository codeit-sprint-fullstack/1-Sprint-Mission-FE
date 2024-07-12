import {user_email, user_name, user_password, user_password_check, signup_button, modal_button, togglePassword, togglePassword_check} from "../Lib/signup_module.js"
import {error_email, error_password, error_password_check} from "../Lib/signup_module.js"
import {error_keydown_email, error_keydown_password, error_keydown_password_check} from "../Lib/signup_module.js"
import {focus_doing, error_name, error_keydown_name, activat, signup, modal_close, toggle_icon, toggle_icon_check} from "../Lib/signup_module.js"

// password 토글 
togglePassword.addEventListener('click', toggle_icon);
togglePassword_check.addEventListener('click', toggle_icon_check);

// error 메세지
user_email.addEventListener('focusout', error_email);
user_email.addEventListener('keyup', error_keydown_email);
user_name.addEventListener('focusout', error_name);
user_name.addEventListener('keyup', error_keydown_name);
user_password.addEventListener('focusout', error_password);
user_password.addEventListener('keyup', error_keydown_password);
user_password_check.addEventListener('focusout', error_password_check);
user_password_check.addEventListener('keyup', error_keydown_password_check);

// enter로 focus 이동
user_email.addEventListener('keyup', focus_doing);
user_name.addEventListener('keyup', focus_doing);
user_password.addEventListener('keyup', focus_doing);
user_password_check.addEventListener('keyup', focus_doing);

// 로그인 버튼 활성화
user_email.addEventListener('focusout', activat);
user_email.addEventListener('keyup', activat);
user_name.addEventListener('focusout', activat);
user_name.addEventListener('keyup', activat);
user_password.addEventListener('focusout', activat);
user_password.addEventListener('keyup', activat);
user_password_check.addEventListener('focusout', activat);
user_password_check.addEventListener('keyup', activat);

// 로그인
signup_button.addEventListener('click', signup);

// 모달창 닫기
modal_button.addEventListener('click', modal_close);