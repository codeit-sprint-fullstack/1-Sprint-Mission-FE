import "../css/header.css";
import mainLog from "../image/mainlogo.png";
import mb_Log from "../image/mb_logo.png";
import useImgResize from "../hooks/Returnresize.js";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const view = useImgResize();

  const getLinkStyle = ({ isActive }) => {
    return {
      color: isActive && "#3692FF",
    };
  };

  return (
    <header>
      <div className="header_box">
        <Link to="/">
          <img
            src={view === "isMobile" ? mb_Log : mainLog}
            className="logo_img"
            alt="메인판다로고"
          />
        </Link>
        <div className="nav_bar">
          <div className="nav_content">
            <NavLink to="/" style={getLinkStyle}>
              자유게시판
            </NavLink>
          </div>
          <div className="nav_content">
            <NavLink to="/items" style={getLinkStyle}>
              중고마켓
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
