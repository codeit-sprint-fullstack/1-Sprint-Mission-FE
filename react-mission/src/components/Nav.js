import userIcon from './img/userIcon.png'

function Nav() {
    return (
        <nav>
            <div className='listContaner'>
                <p className='listFont freeFont'>자유게시판</p>
                <p className='listFont usedFont'>중고마켓</p>
            </div>
            <img className='userIcon' src={userIcon} alt='유저 아이콘'/>   
        </nav>
    );
}

export default Nav;