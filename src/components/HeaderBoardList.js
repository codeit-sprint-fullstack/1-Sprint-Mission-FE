import React from "react";
import './HeaderBoardList.css';
import { Link } from 'react-router-dom';

function HomepageRenderHeader({ freeBoardActive = false, marketBoardActive = false }) {
  return (
      <ul className="boardList">
        <li><Link to ="/" className={freeBoardActive ? "boardBtnActive" : ""}>자유게시판</Link></li> 
        <li><Link to ="/items" className={marketBoardActive ? "boardBtnActive" : ""}>중고마켓</Link></li> 
      </ul>

  );
};

export default HomepageRenderHeader;
