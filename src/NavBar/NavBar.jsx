import profileIcon from "../image/ic_profile.svg";
import logoImg from "../image/img_logo.svg";
import logo from "../image/logo.svg";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="navbar">
      <img
        id="logoImg"
        className="margin-left"
        src={logoImg}
        alt="logoImg"
        onClick={() => (window.location.href = "/")}
      ></img>
      <img
        id="logo"
        className="margin-left"
        src={logo}
        alt="logo"
        onClick={() => (window.location.href = "/")}
      ></img>
      <a className="nav-text">자유게시판</a>
      <a className="nav-text">중고마켓</a>
      <img
        id="profileIc"
        className="margin-right"
        src={profileIcon}
        alt="profileIc"
      ></img>
    </nav>
  );
}
