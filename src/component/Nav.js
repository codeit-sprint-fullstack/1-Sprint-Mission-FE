import logo from "../image/logo.png";
import userIcon from "../image/userIcon.png";
import "./Nav.css";

function Nav() {
  return (
    <div className="Nav">
      <img className="Nav-logo" src={logo} alt="mainLogo" />
      <a className="Nav-text">자유게시판</a>
      <a className="Nav-text">중고마켓</a>
      <img className="Nav-user" src={userIcon} alt="userIcon" />
    </div>
  );
}

export default Nav;
