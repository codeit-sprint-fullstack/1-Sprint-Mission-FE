import "../css/header.css";
import mainLog from "../image/mainlogo.png";
import mb_Log from "../image/mb_logo.png";
import useImgResize from "../hooks/imgresize";

function Header() {
  const view = useImgResize();

  return (
    <header>
      <div className="header_box">
        <img
          src={view === "isMobile" ? mb_Log : mainLog}
          className="logo_img"
          alt="메인판다로고"
        ></img>
        <div className="nav_bar">
          <div className="nav_content">자유게시판</div>
          <div className="nav_content">중고마켓</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
