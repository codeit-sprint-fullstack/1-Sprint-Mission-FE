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

// test js addEventListener
// const button = document.getElementById("pwShow");
// const element = document.getElementById("login_pw");
// button.addEventListener("click", function() {
//     if (element.getAttribute.attr("type") == "password") {
//         element.setAttribute("type", "text");
//     } else {
//         element.setAttribute("type", "password");
//     }
// });

// test JQuery
//  if ($("#login_pw").attr("type") == "password") {
//      $("#login_pw").attr("type", "text");
//  } else {
//      $("#login_pw").attr("type", "password");
//  }

//<img alt="profile" src="https://codeit-images.codeit.com/profile/default_profile.png" class="ProfilePopover_profileImage__NHfSd"></img>