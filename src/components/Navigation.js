import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/pandaLogo.png";
import smallLogo from "../images/pandaLogo_small.png";
import icon from "../images/userIcon.png";
import "../styles/Navigation.css";

function Navigation({ activePath, setActivePath }) {
  //  처음 접속 시 active 상태로
  const location = useLocation();
  useEffect(() => {
    if (!activePath) {
      setActivePath(location.pathname);
    }
  }, [activePath, location.pathname, setActivePath]);

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
