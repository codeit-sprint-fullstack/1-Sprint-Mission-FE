// test js function

const login_pw = document.getElementById("login_pw"); 
const login_pw_show_img = document.getElementById("login_pw_show_img");
function pwVisibiltyOnOff() {
    if (login_pw.type == "password") {
        login_pw.setAttribute("type", "text");
        login_pw_show_img.setAttribute("src", "../Images/btn_visibility_off.svg");
    } else {
        login_pw.setAttribute("type", "password");
        login_pw_show_img.setAttribute("src", "../Images/btn_visibility_on.svg");
    }
};
