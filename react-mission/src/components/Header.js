import pandaLogo from '../img/PandaLogo.png'
import './HeaderStyle.css'
import Nav from './Nav'

function Header() {
    return (
        <header>
            <img className='pandaLogo' src={pandaLogo} alt='판다로고' />
            <Nav />
        </header>
    );
}

export default Header;
