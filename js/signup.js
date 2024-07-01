// test js addEventListener
const login_pw = document.getElementById("login_pw");
const login_pw_show_img = document.getElementById("login_pw_show_img");
login_pw_show_img.addEventListener("click", function() {
    if (login_pw.type == "password") {
        login_pw.type = "text";
        login_pw_show_img.src = "../Images/btn_visibility_off.svg"
    } else {
        login_pw.type = "password";
        login_pw_show_img.src = "../Images/btn_visibility_on.svg"
    }
});

const login_pw_check = document.getElementById("login_pw_check");
const login_pw_check_show_img = document.getElementById("login_pw_check_show_img");
login_pw_check_show_img.addEventListener("click", function() {
    if (login_pw_check.type == "password") {
        login_pw_check.type = "text";
        login_pw_check_show_img.src = "../Images/btn_visibility_off.svg"
    } else {
        login_pw_check.type = "password";
        login_pw_check_show_img.src = "../Images/btn_visibility_on.svg"
    }
});