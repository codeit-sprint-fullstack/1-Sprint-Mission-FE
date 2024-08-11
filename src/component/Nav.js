import { NavLink } from "react-router-dom";
import logo from "../image/logo.png";
import userIcon from "../image/userIcon.png";
import mobileLogo from "../image/mobileLogo.png";
import "./Nav.css";

function Nav() {
  return (
    <div className="Nav">
      <NavLink to="/">
        <img className="Nav-logo" src={logo} alt="mainLogo" />
        <img className="mobileLogo" src={mobileLogo} alt="mobileLogo" />
      </NavLink>
      <div className="Nav-text">자유게시판</div>
      <NavLink
        to="/items"
        className={({ isActive }) => (isActive ? "Nav-text active" : "Nav-text")}
      >
        중고마켓
      </NavLink>
      <button className="login-button">로그인</button>
      <img className="Nav-user" src={userIcon} alt="userIcon" />
    </div>
  );
}

export default Nav;
