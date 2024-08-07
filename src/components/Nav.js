import { Link } from 'react-router-dom';

import styles from './Nav.module.css';
import navLogo from '../img/nav_logo.png';
import navLoginIcon from '../img/nav_login_icon.png';
import mobileLoco from '../img/mobile_logo.png';

function Nav() {
  return (
    <>
      <header className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.menu}>
            <img src={navLogo} className={styles.navLogo} alt='판다마켓로고' />
            <img
              src={mobileLoco}
              className={styles.mobileLogo}
              alt='판다마켓모바일로고'
            />
            <p className='first'>자유게시판</p>
            <Link className={styles.getLinkStyle} to='/items'>
              <p>중고마켓</p>
            </Link>
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
