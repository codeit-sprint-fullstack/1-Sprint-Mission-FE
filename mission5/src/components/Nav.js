import './Nav.css';
import logo from '../assets/imgs/logo.png';
import profile from '../assets/imgs/profile.png';

function Nav() {
  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
          <a href='/'><img src={logo} alt='logo' width="153" height="51"/></a>
        </div>

        <div className='nav-menu'>
          <a className='nav-link' href='#'><p>자유게시판</p></a>
          <a className='nav-link' href='#'><p>중고마켓</p></a>
        </div>

        <div className='profile'>
          <img src={profile} alt='logo' width="40" height="40"/>
        </div>
      </div>
    </nav>
  );
}

export default Nav;