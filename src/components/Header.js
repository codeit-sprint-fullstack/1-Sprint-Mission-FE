import "../assets/styles/header.css";

export function Header() {
  return (
    <header>
      <a className="header__btn-home-frame" href="/" target="_self">
        <span>
          <img className="header__img-home" alt="홈 버튼" />
        </span>
      </a>
      <nav className="header__navi">
        <ul className="header__list">
          <li className="Text-2lg Bold header__list-item">자유게시판</li>
          <li className="Text-2lg Bold header__list-item">중고마켓</li>
        </ul>
      </nav>
      <a className="header__btn-login-frame" href="/login" target="_self">
        <span>
          <img className="header__img-login" alt="로그인 버튼" />
        </span>
      </a>
    </header>
  );
}

export default Header;
