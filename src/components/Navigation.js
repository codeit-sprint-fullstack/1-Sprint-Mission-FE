import React from "react";
import Link from "next/link";
import logo from "../images/pandaLogo.png";
import smallLogo from "../images/pandaLogo_small.png";
import icon from "../images/userIcon.png";
import "@styles/Navigation.css";

function Navigation() {
  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <Link href="/items">
          <img className="logo" src={logo} alt="Home Logo" />
          <img className="small-logo" src={smallLogo} alt="Home Logo small" />
        </Link>
        <div className="menu text-2lg bold">
          <span className="menu-content">
            <Link href="/community">자유게시판</Link>
          </span>
          <span className="menu-content">
            <Link href="/items">중고마켓</Link>
          </span>
        </div>
      </div>
      <img className="icon" src={icon} alt="User Icon" />
    </nav>
  );
}

export default Navigation;
