import React from "react";
import "./Header.css";
import pandaLogo from "../assets/images/panda-face.png";
import pandaMarket from "../assets/images/panda-market.png";
import { Link } from "react-router-dom";

/* 중고마켓 홈페이지 헤더 */
function ItemsPageHeader() {
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
            <a href="#free-board">자유게시판</a>
          </li>
          <li>
            <Link id="item-page-market" to="/items">
              중고마켓
            </Link>
          </li>
        </ul>
      </nav>
      <button id="LoginButton">로그인</button>
    </header>
  );
}

export default ItemsPageHeader;
