"use client";

import React from "react";
import pandaLogo from "../assets/images/panda-face.png";
import pandaMarket from "../assets/images/panda-market.png";
import profileImage from "../assets/images/profile-image.png";
import Link from "next/link"; // Next.js의 Link

/* 판다마켓 헤더 */
function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={pandaLogo} alt="Panda Logo" className="logo" />
        <img
          src={pandaMarket}
          alt="Panda Market"
          className="logo"
          id="pandaMarket_logo"
        />
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link href="/free-board">자유게시판</Link>
          </li>
          <li>
            <Link id="ItemPageMarket" href="/items">
              중고마켓
            </Link>
          </li>
        </ul>
      </nav>
      <img src={profileImage} alt="Profile" className="profile" />
    </header>
  );
}

export default Header;
