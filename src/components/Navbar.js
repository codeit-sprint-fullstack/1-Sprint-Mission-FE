import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="image/logo.svg" alt="Panda" className="panda" />
      <div className="nav-links">
        <a href="/" className="board-link">자유게시판</a>
        <a href="/" className="market-link">중고마켓</a>
      </div>
      <img src="image/profile.svg" alt="Profile" className="profile" />
    </nav>
  );
};

export default Navbar;
