import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [logoSrc, setLogoSrc] = useState('image/logo.svg');

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

  return (
    <nav className="navbar">
      <img src={logoSrc} alt="Panda" className="panda" />
      <div className="nav-links">
        <a href="/" className="board-link">자유게시판</a>
        <a href="/" className="market-link">중고마켓</a>
      </div>
      <img src="image/profile.svg" alt="Profile" className="profile" />
    </nav>
  );
};

export default Navbar;

