import React from "react";
import logo from "../images/pandaLogo.png";
import smallLogo from "../images/pandaLogo_small.png";
import icon from "../images/userIcon.png";
import "../styles/Navigation.css";

function Navigation() {
  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <a href="/" target="_self">
          <img className="logo" src={logo} alt="Home Logo" />
          <img className="small-logo" src={smallLogo} alt="Home Logo small" />
        </a>
        <div className="menu text-2lg bold">
          <span className="menu-content">자유게시판</span>
          <span className="menu-content">중고마켓</span>
        </div>
      </div>
      <img className="icon" src={icon} alt="User Icon" />
    </nav>
  );
}

export default Navigation;
