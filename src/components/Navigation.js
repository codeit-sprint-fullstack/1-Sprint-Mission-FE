import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/pandaLogo.png";
import smallLogo from "../images/pandaLogo_small.png";
import icon from "../images/userIcon.png";
import "../styles/Navigation.css";

function Navigation({ activePath, setActivePath }) {
  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <Link to="/items" target="_self">
          <img className="logo" src={logo} alt="Home Logo" />
          <img className="small-logo" src={smallLogo} alt="Home Logo small" />
        </Link>
        <div className="menu text-2lg bold">
          <span className="menu-content">자유게시판</span>
          <span className="menu-content">
            <Link
              to="/items"
              className={activePath === "/items" ? "active" : ""}
              onClick={() => setActivePath("/items")}
            >
              중고마켓
            </Link>
          </span>
        </div>
      </div>
      <img className="icon" src={icon} alt="User Icon" />
    </nav>
  );
}

export default Navigation;
