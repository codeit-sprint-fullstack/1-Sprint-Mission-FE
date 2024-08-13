import './Nav.css';
import logo from '../assets/imgs/logo.png';
import logo_mobile from '../assets/imgs/logo_mobile.png';
import useMediaQuery from '../hook/useMediaQuery';
import { Link, NavLink } from 'react-router-dom';

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? '#3692FF' : '#4B5563',
  };
}

function Nav() {
  // useMediaQuery hook 사용하여 모바일 화면 여부 판단
  const mobile = useMediaQuery('(min-width: 375px) and (max-width: 786px)');

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          {!mobile ? (
            <Link to="/">
              <img src={logo} alt="logo" width="153" height="51" />
            </Link>
          ) : (
            <Link to="/">
              <img src={logo_mobile} alt="logo" width="81" height="40" />
            </Link>
          )}
        </div>

        <div className="nav-menu">
          <NavLink to="/board" className="nav-link" style={getLinkStyle}>
            <p>자유게시판</p>
          </NavLink>
          <NavLink to="/items" className="nav-link" style={getLinkStyle}>
            <p>중고마켓</p>
          </NavLink>
        </div>

        <div className="login">
          <button>로그인</button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
