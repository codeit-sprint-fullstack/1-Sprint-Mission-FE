import React from "react";
import logo from "../images/pandaLogo.png";
import icon from "../images/userIcon.png";
import "../styles/Navigation.css";

function Navigation() {
  return (
    <nav id="nav-bar">
      <div className="nav-left">
        <img className="logo" src={logo} alt="Home Logo" />
        <div className="menu Text-2lg Bold">
          <span className="menu-content">자유게시판</span>
          <span className="menu-content">중고마켓</span>
        </div>
      </div>
      <img className="icon" src={icon} alt="User Icon" />
    </nav>
  );
}

export default Navigation;
