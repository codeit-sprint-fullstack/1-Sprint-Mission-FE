import './Nav.css'
// import userIcon from './img/userIcon.png' // 미션 6으로 인한 주석
import { NavLink } from 'react-router-dom';

const getLinkStyle = ({isActive}) => {
    return {
        color: isActive? '#3692FF': '#4b5563',
        textDecoration: 'none'
    }
}

function Nav() {
    return (
        <nav>
            <div className='listContaner'>
                <p className='listFont freeFont'>자유게시판</p>
                <NavLink to='/items' style={getLinkStyle}><p className='listFont usedFont'>중고마켓</p></NavLink>
            </div>
            <div class="login">로그인</div>
            {/* <img className='userIcon' src={userIcon} alt='유저 아이콘'/> */} {/* 미션 6으로 인한 주석 */}
        </nav>
    );
}

export default Nav;
