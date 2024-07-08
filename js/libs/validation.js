const PW_MIN_LENGTH = 8;
// state of warning
let email_warn = false;
let pw_warn = false;
let pw_check_warn = false;

export function delete_warning_border(input_sec_el)
{
    let input_el = input_sec_el.querySelector("input");

    input_el?.classList.toggle("red_border", false);
}

export function delete_warning_text(input_sec_el)
{
    let text_el = input_sec_el.querySelector("a");
    text_el?.remove(); 
}

function set_email_warn(email_sec_el, warn
    , email_el = email_sec_el.querySelector("input")) 
{
    if(email_warn === warn)
    {
        return;
    }

    if(warn)
    {
        email_warn = warn;
        let login_email_invalid_message = document.createElement('a');
        login_email_invalid_message.classList.add("warning_text");   
        login_email_invalid_message.textContent = "잘못된 이메일입니다.";
        email_sec_el.append(login_email_invalid_message);        

        email_el.classList.toggle("red_border", true);
    }
    else
    {
        email_warn = warn;
        delete_warning_border(email_sec_el);
        delete_warning_text(email_sec_el);
    }
}

function validate_email(email_el)
{
    return email_el.checkValidity();
}

export function is_valid_email(email_sec_el
    , email_el = email_sec_el.querySelector("input"))
{
    let warn = !validate_email(email_el);
    set_email_warn(email_sec_el, warn, email_el);
}

export function check_pw_check(pw_sec_el)
{
    console.log("meta name test" + "pw_sec_el : " + pw_sec_el);
    is_valid_pw_check(document.getElementById("login_pw_check").parentElement.parentElement, pw_sec_el);
}

function set_pw_warn(pw_sec_el, warn
    , pw_el = pw_sec_el.querySelector("input"))
{
    if(pw_warn === warn)
    {
        return;
    }
    
    if(warn)
    {
        pw_warn = warn;
        let login_pw_invalid_message = document.createElement('a');
        login_pw_invalid_message.classList.add("warning_text");   
        login_pw_invalid_message.textContent = "비밀번호를 8자 이상 입력해주세요.";        
        pw_sec_el.append(login_pw_invalid_message);

        pw_el.classList.toggle("red_border", true);
    }
    else
    {
        pw_warn = warn;
        delete_warning_border(pw_sec_el);
        delete_warning_text(pw_sec_el);
    }
}

function validate_pw(pw_el) 
{
    return pw_el.value.length >= PW_MIN_LENGTH;
}

export function is_valid_pw(pw_sec_el
    , pw_el = pw_sec_el.querySelector("input")) 
{
    let warn = !validate_pw(pw_el);
    set_pw_warn(pw_sec_el, warn, pw_el);
}

function set_pw_check_warn(pw_check_sec_el, warn
    , pw_check_el = pw_check_sec_el.querySelector("input"))
{
    if(pw_check_warn === warn)
    {
        return;
    }

    if( warn )
    {
        pw_check_warn = warn;
        let login_pw_check_invalid_message = document.createElement('a');
        login_pw_check_invalid_message.classList.add("warning_text");   
        login_pw_check_invalid_message.textContent = "비밀번호가 일치하지 않습니다.";
        pw_check_sec_el.append(login_pw_check_invalid_message);

        pw_check_el.classList.toggle("red_border", true);
    }
    else
    {
        pw_check_warn = warn;
        delete_warning_border(pw_check_sec_el);
        delete_warning_text(pw_check_sec_el);
    }
}

function validate_pw_check(pw_check_el, pw_el)
{
    return (pw_check_el.value === pw_el.value);
}

export function is_valid_pw_check(pw_check_sec_el, pw_sec_el
    , pw_check_el = pw_check_sec_el.querySelector("input")
    , pw_el = pw_sec_el.querySelector("input")) 
{
    let warn = !validate_pw_check(pw_check_el, pw_el);
    console.log("func : is_valid_pw_check : " + pw_check_el.value + " != " + pw_el.value);
    set_pw_check_warn(pw_check_sec_el, warn, pw_check_el);
}

export function can_click_login_button(email_el, pw_el)
{
    console.log("can_click_login_button");
    if( validate_email(email_el) 
        && validate_pw(pw_el))
    {
        console.log("can click login button");
        document.getElementById("btn_login").classList.toggle("btn_active_style", true);
    }
    else
    {    
        console.log("cannot click login button");
        document.getElementById("btn_login").classList.toggle("btn_active_style", false);
    }
}

export function can_click_sugnup_button(email_el, pw_el, pw_check_el)
{   
    if( validate_email(email_el) 
        && validate_pw(pw_el) 
        && validate_pw_check(pw_check_el, pw_el))
    {
        console.log("can click signup button");
        document.getElementById("btn_signup").classList.toggle("btn_active_style", true);
    }
    else
    {    
        console.log("cannot click signup button");
        document.getElementById("btn_signup").classList.toggle("btn_active_style", false);
    }
}

export function toggle_visible_icon(input_el, img_el)
{
    if (input_el.type == "password") {
        input_el.type = "text";
        img_el.src = "/Images/btn_visibility_off.svg";
    } else {
        input_el.type = "password";
        img_el.src = "/Images/btn_visibility_on.svg";
    }
}