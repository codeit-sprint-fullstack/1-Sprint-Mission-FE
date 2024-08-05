import './Nav.css';
import logo from '../assets/imgs/logo.png';
import logo_mobile from '../assets//imgs/logo_mobile.png';
import profile from '../assets/imgs/profile.png';
import useMediaQuery from './useMediaQuery';

function Nav() {
  // useMediaQuery hook 사용하여 모바일 화면 여부 판단
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

        <div className='login'>
          <button>로그인</button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;