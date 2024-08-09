import './Nav.css';
import { Link, NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => {
  return { color: isActive ? '#3692FF' : undefined };
};

function Nav() {
  return (
    <>
      <div className="nav-bar">
        <div className="nav-box">
          <div className="nav-text-box">
            <Link to="/">
              <div className="logo"></div>
            </Link>
            <div>
              <NavLink to="*" style={linkStyle}>
                자유게시판
              </NavLink>
            </div>
            <div>
              <NavLink to="/items" style={linkStyle}>
                중고마켓
              </NavLink>
            </div>
          </div>
          <div className="my-logo"></div>
        </div>
      </div>
    </>
  );
}

export default Nav;
