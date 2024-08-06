import "../assets/styles/header.css";
import { Nav, NavItem } from "./Nav";
import { Link } from "react-router-dom";
import Profile from "./Profile";

export function Header() {
  const tempIsSignin = false;

  const handleProfileClick = () => {
    alert("아직 구현되지 않은 기능입니다");
  };

  return (
    <header>
      {/* <a className="header__btn-home-frame" href="/" target="_self">
        <span>
          <img className="header__img-home" alt="홈 버튼" />
        </span>
      </a> */}
      <Link className="header__btn-home-frame" to="/">
        <img className="header__img-home" alt="홈 버튼" />
      </Link>
      <Nav className="header__nav">
        <NavItem className="Text-2lg Bold header__nav-item" linkto="/free">
          자유게시판
        </NavItem>
        <NavItem className="Text-2lg Bold header__nav-item" linkto="/item">
          중고마켓
        </NavItem>
      </Nav>
      {tempIsSignin ? (
        <Profile onClick={handleProfileClick} />
      ) : (
        <a className="header__btn-login-frame" href="/login" target="_self">
          <span>
            <img className="header__img-login" alt="로그인 버튼" />
          </span>
        </a>
      )}
    </header>
  );
}

export default Header;
