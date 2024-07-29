import logo from "../image/logo.png";
import userIcon from "../image/userIcon.png";
import mobileLogo from "../image/mobileLogo.png"
import "./Nav.css";

function Nav() {

  const clickLogo = () => {
    window.location.href = "/";
  }

  return (
    <div className="Nav">
      <img className="Nav-logo" src={logo} alt="mainLogo" onClick={clickLogo} />
      <img className="mobileLogo" src={mobileLogo} alt="mobileLogo" onClick={clickLogo} />
      <a className="Nav-text">자유게시판</a>
      <a className="Nav-text">중고마켓</a>
      <img className="Nav-user" src={userIcon} alt="userIcon" />
    </div>
  );
}

export default Nav;
