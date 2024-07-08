import { USER_DATA } from "/data/user_data.js"
import { is_valid_email, is_valid_pw, is_valid_pw_check, check_pw_check, can_click_sugnup_button, toggle_visible_icon } from "/js/libs/validation.js"

const sign_email = document.getElementById("login_email");
const sign_email_sec = sign_email.parentElement;

const sign_pw = document.getElementById("login_pw");
const sign_pw_sec = sign_pw.parentElement.parentElement;
const sign_pw_show_img = document.getElementById("login_pw_show_img");

const sign_pw_check = document.getElementById("login_pw_check");
const sign_pw_check_sec = sign_pw_check.parentElement.parentElement;
const sign_pw_check_show_img = document.getElementById("login_pw_check_show_img");

const btn_signup = document.getElementById("btn_signup");

const dialog_warn = document.getElementsByClassName("dialog_warn")[0];
const dialog_text = document.getElementById("dialog_text");
const btn_wrong_pw_dialog = document.getElementById("btn_dialog");


sign_email.addEventListener("focusout", () => {
    is_valid_email(sign_email_sec);
    can_click_sugnup_button(sign_email, sign_pw, sign_pw_check);
});
sign_email.addEventListener("focusin", () => 
    is_valid_email(sign_email_sec)
);

sign_pw.addEventListener("focusout", () => {
    check_pw_check(sign_pw_sec);
    is_valid_pw(sign_pw_sec);
    can_click_sugnup_button(sign_email, sign_pw, sign_pw_check);
});
sign_pw.addEventListener("focusin", () => 
    is_valid_pw(sign_pw_sec)
);

sign_pw_show_img.addEventListener("click", function() {
    toggle_visible_icon(sign_pw, sign_pw_show_img);
});

sign_pw_check.addEventListener("focusout", () => {
    is_valid_pw_check(sign_pw_check_sec, sign_pw_sec);
    can_click_sugnup_button(sign_email, sign_pw, sign_pw_check);
});
sign_pw_check.addEventListener("focusin", () => 
    is_valid_pw_check(sign_pw_check_sec, sign_pw_sec)
);

sign_pw_check_show_img.addEventListener("click", function() {
    toggle_visible_icon(sign_pw_check, sign_pw_check_show_img);
});

btn_wrong_pw_dialog.addEventListener("click", () => dialog_warn.close());

btn_signup.addEventListener("click", () => {
    if(btn_signup.classList.contains("btn_active_style"))
    {
        let user_id = Array.from(USER_DATA.map(x => x.email));

        if(user_id.includes(sign_email.value))
        {
            dialog_text.textContent = "사용 중인 이메일입니다.";
            dialog_warn.showModal();
            return;
        }
    
        window.open("/login", "_self");
    }    
});
