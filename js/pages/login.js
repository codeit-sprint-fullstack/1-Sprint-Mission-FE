import { USER_DATA } from "/data/user_data.js"
import { is_valid_email, is_valid_pw, can_click_login_button, toggle_visible_icon } from "/js/libs/validation.js"


// need to change after html structure
const login_email = document.getElementById("login_email");

const login_email_sec = login_email.parentElement;
const login_pw = document.getElementById("login_pw");
const login_pw_sec = login_pw.parentElement.parentElement;
const login_pw_show_img = document.getElementById("login_pw_show_img");

const btn_login = document.getElementById("btn_login");

const dialog_warn = document.getElementsByClassName("dialog_warn")[0];
const dialog_text = document.getElementById("dialog_text");
const btn_wrong_pw_dialog = document.getElementById("btn_dialog");

// email focusin event : delete login email input & remove warning text tag 
login_email.addEventListener("focusin", () => {
    is_valid_email(login_email_sec);
});
// email focusout event : check input value validation 
login_email.addEventListener("focusout", () => {
    is_valid_email(login_email_sec);
    can_click_login_button(login_email, login_pw);
});

// pw focusin event : 
login_pw.addEventListener("focusin", () => {
    is_valid_pw(login_pw_sec);
});
// pw focusout event :
login_pw.addEventListener("focusout", () => {
    is_valid_pw(login_pw_sec);
    can_click_login_button(login_email, login_pw);
});

// pw focus event :
login_pw_show_img.addEventListener("click", () => {
    toggle_visible_icon(login_pw, login_pw_show_img);
});

btn_wrong_pw_dialog.addEventListener("click", () => 
    dialog_warn.close()
);

// 
btn_login.addEventListener("click", () => {
    if(btn_login.classList.contains("btn_active_style"))
    {
        let email = false;
        let pw = false;

        USER_DATA.forEach(el => {
            if(el.email === login_email.value)
            {
                email = true;

                if(el.password === login_pw.value)
                {
                    window.open("/items", "_self");
                    pw = true;
                    return;
                }
                else
                {
                    pw = false;
                    return;
                }
            }
        });

        if(email && !pw)
        {
            // 비밀번호가 일치하지 않습니다.
            dialog_text.textContent = "비밀번호가 일치하지 않습니다.";
            dialog_warn.showModal();
        }
        else if(!eamil && !pw)
        {
            dialog_text.textContent = "등록되지 않은 이메일입니다.";
            dialog_warn.showModal();
        }        
    }
});