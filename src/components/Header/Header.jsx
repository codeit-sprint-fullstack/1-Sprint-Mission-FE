import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';

import Nav from '../Nav/Nav';
import logoImg from '../../assets/logo.svg';
import mobileLogo from '../../assets/logo_mobile.svg';
import profileIcon from '../../assets/profile_icon.svg';
import './Header.css';

function Header() {
  const mobileSize = useMediaQuery('mobileSize');
  return (
    <header className='Header'>
      <div className='header-container'>
        <Link to='/home'>
          <img
            className='logo'
            src={mobileSize ? mobileLogo : logoImg}
            alt='panda market logo'
          />
        </Link>
        <Nav />
        <img className='profile-icon' src={profileIcon} alt='profile icon' />
      </div>
    </header>
  );
}

export default Header;
