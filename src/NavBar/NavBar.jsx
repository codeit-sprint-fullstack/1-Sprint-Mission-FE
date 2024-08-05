import React from "react";
import { Link, useLocation } from "react-router-dom";
import profileIcon from "../image/ic_profile.svg";
import logoImg from "../image/img_logo.svg";
import logo from "../image/logo.svg";
import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/">
        <img id="logoImg" className="margin-left" src={logoImg} alt="logoImg" />
      </Link>
      <Link to="/">
        <img id="logo" className="margin-left" src={logo} alt="logo" />
      </Link>
      <Link to="/board" className="nav-text">
        자유게시판
      </Link>
      <Link
        to="/items"
        className={`nav-text ${location.pathname === "/items" ? "active" : ""}`}
      >
        중고마켓
      </Link>
      <img
        id="profileIc"
        className="margin-right"
        src={profileIcon}
        alt="profileIc"
      />
    </nav>
  );
}
