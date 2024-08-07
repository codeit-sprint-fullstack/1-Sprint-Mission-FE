import HeaderLogo from "./img/Header_logo.svg";
import HeaderMy from "./img/Header_my.svg";
import "./header.css";

function Header() {
  return (
    <div id="header">
      <a href="https://extraordinary-lily-d8e584.netlify.app/">
        <img id="header-logo-img" alt="" src={HeaderLogo}></img>
      </a>

      <div id="header-str">
        <p>자유게시판</p>
        <p>중고마켓</p>
      </div>

      <img id="header-my-img" alt="" src={HeaderMy}></img>
    </div>
  );
}

export default Header;
