import React from "react";
import logo from "../images/pandaLogo.png";
import icon from "../images/userIcon.png";
import "../styles/Navigation.css";

function Navigation() {
  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <a href="/" target="_self">
          <img className="logo" src={logo} alt="Home Logo" />
        </a>
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
