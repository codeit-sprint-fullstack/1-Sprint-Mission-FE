import profileIc from "./image/ic_profile.svg";
import logoImg from "./image/img_logo.svg";
import "./Nav.css";

export function CreateNav() {
  return (
    <nav className="navbar">
      <img
        id="logoImg"
        className="margin-left"
        src={logoImg}
        alt="logoImg"
        onClick={() => (window.location.href = "/")}
      ></img>
      <a className="nav-text">자유게시판</a>
      <a className="nav-text">중고마켓</a>
      <img
        id="profileIc"
        className="margin-right"
        src={profileIc}
        alt="profileIc"
      ></img>
    </nav>
  );
}
