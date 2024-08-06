import "../css/header.css";
import mainLog from "../image/mainlogo.png";
import mb_Log from "../image/mb_logo.png";
import useImgResize from "../hooks/Returnresize.js";
import { Link } from "react-router-dom";

function Header() {
  const view = useImgResize();

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
          <Link to="/">
            <div className="nav_content">자유게시판</div>
          </Link>
          <Link to="/">
            <div className="nav_content">중고마켓</div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
