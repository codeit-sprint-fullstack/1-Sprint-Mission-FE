import "../assets/styles/header.css";

export function Header() {
  return (
    <header>
      <a id="header_btn_home" href="/" target="_self">
        <span>
          <img id="header_img_btn_home" alt="홈 버튼" />
        </span>
      </a>
      <nav className="home_navi">
        <ul className="home_list">
          <li className="home_list_item">
            <a>자유게시판</a>
          </li>
          <li className="home_list_item">
            <a>중고마켓</a>
          </li>
        </ul>
      </nav>
      <a id="btn_login" href="/login" target="_self">
        <span>
          <img id="img_btn_login" alt="로그인 버튼" />
        </span>
      </a>
    </header>
  );
}

export default Header;
