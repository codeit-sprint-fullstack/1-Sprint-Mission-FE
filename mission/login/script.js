import { user_email, user_password, login_button, modal_button, togglePassword } from "../Lib/login_module.js";
import {login, activat, error_email, error_keydown_email, error_password, error_keydown_password, focus_doing, modal_close, toggle_icon} from '../Lib/login_module.js'

// password 토글
togglePassword.addEventListener('click', toggle_icon);

// error 메세지
user_email.addEventListener('focusout', error_email);
user_email.addEventListener('keyup', error_keydown_email);
user_password.addEventListener('focusout', error_password);
user_password.addEventListener('keyup', error_keydown_password);

// enter로 focus 이동
user_email.addEventListener('keyup', focus_doing);
user_password.addEventListener('keyup', focus_doing);

// 로그인 버튼 활성화
user_email.addEventListener('focusout', activat);
user_email.addEventListener('keyup', activat);
user_password.addEventListener('focusout', activat);
user_password.addEventListener('keyup', activat)

// 로그인
login_button.addEventListener('click', login);

// 모달창 닫기
modal_button.addEventListener('click', modal_close);