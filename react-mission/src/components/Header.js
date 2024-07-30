
import { useEffect, useState } from 'react';
import pandaLogo from './img/PandaLogo.png'
import textLogo from './img/textLogo.png'
import Nav from './Nav'

function Header() {
    const [ logoImg, setLogoImg ] = useState(null)

    function handleResize() {
        const length = window.innerWidth;
        
        if (length >= 768) {
            setLogoImg(pandaLogo)
        } else if (length >= 375 && length < 768) {
            setLogoImg(textLogo);
        }
    }
       
    useEffect(() => {
        // 초기 사이즈 설정
        handleResize();
        
        // 윈도우 리사이즈 이벤트 핸들러 등록
        window.addEventListener("resize", handleResize);

        // 컴포넌트 언마운트 시 이벤트 핸들러 제거
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header>
            <a href='/'>
                <img className='Logo' src={logoImg} alt='판다로고' />
            </a>
            <Nav />
        </header>
    );
}

export default Header;
