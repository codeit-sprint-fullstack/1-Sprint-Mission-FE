import React from "react";
import './HomepageRenderHeader.css';
import { Link } from 'react-router-dom';

// 리소스
import logoImg from "../images/logo.svg";
import profileImge from "../images/profile.svg";

function HomepageRenderHeader() {
  return (
    <header className="headerContain">
      <img src={logoImg} alt="판다마켓" className="logoImg"/>
      <ul className="boardList">
        <li>자유게시판</li>
        <li><Link to ="/items">중고마켓</Link></li>
      </ul>
      <img src={profileImge} alt="프로필" className="profileImg"/>
    </header>
  );
};

export default HomepageRenderHeader;
