import './Nav.css';
import logo from '../assets/imgs/logo.png';
import logo_mobile from '../assets//imgs/logo_mobile.png';
import profile from '../assets/imgs/profile.png';
import useMediaQuery from './useMediaQuery';

function Nav() {
  const mobile = useMediaQuery('(min-width: 375px) and (max-width: 786px)');

  return (
    <nav>
      <div className='nav-container'>
        <div className='logo'>
          {(!mobile) ? 
          <a href='/'><img src={logo} alt='logo' width="153" height="51"/></a>
          :
          <a href='/'><img src={logo_mobile} alt='logo' width="81" height="40"/></a>
          }
          
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