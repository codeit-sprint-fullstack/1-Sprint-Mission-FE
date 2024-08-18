import HeaderLogo from "./img/Header_logo.svg";
import HeaderLogo2 from "./img/HeaderLogo2.svg";
import "./header.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div id="header">
      <a href="https://extraordinary-lily-d8e584.netlify.app/">
        <img id="headerLogoImg" alt="" src={HeaderLogo}></img>
        <img id="headerLogoImg2" alt="" src={HeaderLogo2}></img>
      </a>

      <div id="headerStr">
        <p>자유게시판</p>
        <NavLink
          to="/items"
          id="linkStr"
          style={({ isActive }) => ({
            color: isActive ? "#3692FF" : "",
          })}
        >
          <p>중고마켓</p>
        </NavLink>
      </div>
      <button id="headerMyLogin">로그인</button>
    </div>
  );
}

export default Header;
