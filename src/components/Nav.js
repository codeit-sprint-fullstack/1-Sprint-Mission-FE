import React from "react";
import { useState } from "react";
import search from "../images/icon/ic_search.svg";
import arrow from "../images/icon/ic_arrow_down.svg";
import "./Nav.css";

const Nav = () => {
  const [searchInput, inputSet] = useState("");
  const [dropDownView, viewSet] = useState(false);
  const [sortOption, optionSet] = useState('최신순');

  const handleInput = (e) => {
    inputSet(e.target.value);
  };
  
  const toggleView = () => {
    viewSet(!dropDownView);
  };

  const optionChange = (option) => {
    optionSet(option);
    toggleView();
  }

  return (
    <nav className="navContain">
      <div className="navSubject">판매 중인 상품</div>
      <div className="searchBox">
        <img src={search} alt="검색" />
        <input
          type="text"
          value={searchInput}
          onChange={handleInput}
          placeholder="검색할 상품을 입력해주세요"
        />  
      </div>
      <button className="registerBtn">
        <span>상품 등록하기</span>
      </button>
      <div>
        <button className="sortByBtn" onClick={toggleView}>
          <span>{sortOption}</span>
          <img src={arrow} alt="클릭" />
        </button>
        {dropDownView &&
          <ul className="dropDownList">
            <li onClick={() => {optionChange('최신순');}}>최신순</li>
            <li onClick={() => {optionChange('좋아요순');}}>좋아요순</li>
          </ul>
        }
      </div>
    </nav>
  );
};

export default Nav;