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
      <Link>
        <img id="logoImg" className="margin-left" src={logoImg} alt="logoImg" />
      </Link>
      <Link>
        <img id="logo" className="margin-left" src={logo} alt="logo" />
      </Link>
      <Link className="nav-text">자유게시판</Link>
      <Link
        to="/items"
        className={`nav-text ${location.pathname === "/items" ? "active" : ""}`}
      >
        중고마켓
      </Link>
      <button id="login-btn" className="margin-right" type="button">
        로그인
      </button>
    </nav>
  );
}
