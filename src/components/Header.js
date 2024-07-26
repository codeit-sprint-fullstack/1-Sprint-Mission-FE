import { Link } from 'react-router-dom';

import Nav from './Nav';
import logoImg from '../assets/logo.svg';
import profileIcon from '../assets/profile_icon.svg';
import './Header.css';

function Header() {
  return (
    <header className='Header'>
      <div className='header-container'>
        <Link to='/home'>
          <img className='logo' src={logoImg} alt='panda market logo' />
        </Link>
        <Nav />
        <img className='profile-icon' src={profileIcon} alt='profile icon' />
      </div>
    </header>
  );
}

export default Header;
