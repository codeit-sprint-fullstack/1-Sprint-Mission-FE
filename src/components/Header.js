import '../assets/styles/Header.css';
import logo from '../assets/img/logo.png'
import user from '../assets/img/user.svg'

function Header() {
  return (
  <header className="header">
    <div className="navi">
      <a href="./" className="logo">
        <img src={logo} alt="logo" />
      </a>
      <div className="menu">
        <a href="./">
          <div>자유게시판</div>
        </a>
        <a href="./">
          <div>중고마켓</div>
        </a>
      </div>
    </div>
    <a href="./" className="user">
      <img src={user}  alt="user" />
    </a>
  </header>
  );
}

export default Header;
