import pandaLogo from '../../assets/images/logo-pic.png';
import pandaText from '../../assets/images/logo-text.png';
import userImg from '../../assets/images/user.png';
import './header.css';
import { Link, NavLink } from 'react-router-dom';

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? '#3692FF' : '#4b5563',
  };
}

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/" className="headerLogo">
          <img src={pandaLogo} alt={pandaLogo} className="pandaLogo" />
          <img src={pandaText} alt={pandaText} className="pandaText" />
        </Link>
        <div className="nav">
          <NavLink to="/community" className="navContent" style={getLinkStyle}>
            자유게시판
          </NavLink>
          <NavLink to="/items" className="navContent" style={getLinkStyle}>
            중고마켓
          </NavLink>
        </div>
        <img src={userImg} alt={userImg} className="user" />
      </nav>
    </header>
  );
};

export default Header;
