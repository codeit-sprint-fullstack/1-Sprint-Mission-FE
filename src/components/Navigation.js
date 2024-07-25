import React from "react";
import logo from "../images/pandaLogo.png";
import icon from "../images/userIcon.png";

function Navigation() {
  return (
    <nav>
      <img src={logo} alt="Home Logo" />
      <div>
        <span>자유게시판</span>
        <span>중고마켓</span>
      </div>
      <img src={icon} alt="User Icon" />
    </nav>
  );
}

export default Navigation;
