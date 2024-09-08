import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Navbar.css';

const Navbar = () => {
  const [logoSrc, setLogoSrc] = useState('image/logo.svg');
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 탐색 기능 추가

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
      <img
        src={logoSrc}
        alt="Panda"
        className="panda"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      />
      <div className="nav-links">
        <Link to="/" className="board-link">자유게시판</Link>
        <Link to="/items" className={`market-link ${location.pathname === '/items' ? 'active' : ''}`}>중고마켓</Link>
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

