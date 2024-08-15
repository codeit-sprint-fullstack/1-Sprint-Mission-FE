import { Link, NavLink } from 'react-router-dom';

import styles from './Nav.module.css';
import navLogo from '../img/nav_logo.png';
import navLoginIcon from '../img/nav_login_icon.png';
import mobileLoco from '../img/mobile_logo.png';

const activeStyle = {
  color: '#6392ff',
};

function Nav() {
  return (
    <>
      <header className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.menu}>
            <Link to='/'>
              <img
                src={navLogo}
                className={styles.navLogo}
                alt='판다마켓로고'
              />
              <img
                src={mobileLoco}
                className={styles.mobileLogo}
                alt='판다마켓모바일로고'
              />
            </Link>
            <p className='first'>자유게시판</p>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.getLinkStyle
              }
              to='/items'
            >
              <p>중고마켓</p>
            </NavLink>
          </div>
          <img
            className={styles.userImage}
            src={navLoginIcon}
            alt='판다마켓로고'
          />
        </div>
      </header>
    </>
  );
}

export default Nav;
