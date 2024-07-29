import React from "react";
import "assets/styles/App.css";
import arrow from "assets/images/arrow.png";

function PaginationBtn({
  currentPage,
  setCurrentPage,
  totalCount,
  itemsPerPage,
}) {
  const pagesPerGroup = 5;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);

  const changePage = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const changeGroup = (groupNumber) => {
    const newGroup = currentGroup + groupNumber;
    const newPage = newGroup * pagesPerGroup + 1;
    changePage(newPage);
  };

  const renderPageNumbers = () => {
    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((i) => (
      <div
        key={i}
        className={`pagination_btn ${currentPage === i ? "active" : ""}`}
        onClick={() => changePage(i)}
      >
        {i}
      </div>
    ));
  };

  return (
    <div className="pagination_list">
      <div className="pagination_btn rotate" onClick={() => changeGroup(-1)}>
        <img src={arrow} alt="left arrow" />
      </div>
      {renderPageNumbers()}
      <div className="pagination_btn" onClick={() => changeGroup(1)}>
        <img src={arrow} alt="right arrow" />
      </div>
    </div>
  );
}

export default PaginationBtn;
