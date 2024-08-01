import React from 'react';
import './Footer.css';

const Footer = ({ nowPage, showPageNum, pageState }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= showPageNum; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={nowPage === i ? "activeBtn" : "pageNumBtn"}
          onClick={() => pageState(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };



  return (
    <footer className="footerContain">
      <div className="pagination">
        <button
          className="pageMoveBtn"
          onClick={() => pageState(nowPage - 1)}
          disabled={nowPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          className="pageMoveBtn"
          onClick={() => pageState(nowPage + 1)}
          disabled={nowPage === showPageNum}
        >
          &gt;
        </button>
      </div>
    </footer>
  );
};

export default Footer;