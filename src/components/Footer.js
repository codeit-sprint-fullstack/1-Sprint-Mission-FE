import React from "react";
import "../styles/Footer.css";

function Footer({ currentPage, totalPage, onChangePage }) {
  const handlePrevPage = () => {
    if (currentPage > 1) onChangePage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPage) onChangePage(currentPage + 1);
  };

  const makeNumberButton = () => {
    const pageNumbers = [];
    let startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
    let endPage = startPage + 4 > totalPage ? totalPage : startPage + 4;

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          className={`page-button ${
            currentPage === i ? "on" : ""
          } Text-lg Regular`}
          key={i}
          onClick={() => onChangePage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="footer">
      <button
        className={`page-button ${
          currentPage === 1 ? "disabled" : ""
        } Text-lg Regular`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {makeNumberButton()}
      <button
        className={`page-button ${
          currentPage === totalPage ? "disabled" : ""
        } Text-lg Regular`}
        onClick={handleNextPage}
        disabled={currentPage === totalPage}
      >
        &gt;
      </button>
    </div>
  );
}

export default Footer;
