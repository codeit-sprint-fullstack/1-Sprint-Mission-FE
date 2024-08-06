import pandaLogo from '../../assets/images/logo-pic.png';
import pandaText from '../../assets/images/logo-text.png';
import userImg from '../../assets/images/user.png';
import './header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="headerLogo">
          <img src={pandaLogo} alt={pandaLogo} className="pandaLogo" />
          <img src={pandaText} alt={pandaText} className="pandaText" />
        </div>
        <div className="nav">
          <div className="navContent">자유게시판</div>
          <div className="navContent">중고마켓</div>
        </div>
        <img src={userImg} alt={userImg} className="user" />
      </nav>
    </header>
  );
};

export default Header;
