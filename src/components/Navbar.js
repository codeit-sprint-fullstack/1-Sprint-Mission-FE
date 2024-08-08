import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [logoSrc, setLogoSrc] = useState('image/logo.svg');
  const location = useLocation();

  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth <= 743) {
        setLogoSrc('image/mobile_logo.svg');
      } else {
        setLogoSrc('image/logo.svg');
      }
    };

    window.addEventListener('resize', updateLogo);
    updateLogo(); // 초기 로고 설정

    return () => {
      window.removeEventListener('resize', updateLogo);
    };
  }, []);

  const navbarClass = location.pathname === '/registration' ? 'navbar registration-page' : 'navbar';

  return (
    <nav className={navbarClass}>
      <img src={logoSrc} alt="Panda" className="panda" />
      <div className="nav-links">
        <Link to="/" className="board-link">자유게시판</Link>
        <Link to="/" className="market-link">중고마켓</Link>
      </div>
      {location.pathname === '/registration' ? (
        <button className="login-button">로그인</button>
      ) : (
        <img src="image/profile.svg" alt="Profile" className="profile" />
      )}
    </nav>
  );
};

export default Navbar;

