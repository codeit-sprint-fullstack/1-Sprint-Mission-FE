import React from "react";
import "./Pagination.css";

export function Pagination({ currentPage, onPageChange, totalPages }) {
  const pagesPerGroup = 5;
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const currentGroupPages = Array.from(
    {
      length: Math.min(
        pagesPerGroup,
        totalPages - currentGroup * pagesPerGroup
      ),
    },
    (_, i) => currentGroup * pagesPerGroup + i + 1
  );

  const handlePageChange = (page, event) => {
    event.preventDefault();
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const handleNextPage = (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="btnContainer">
      <button
        className="shiftBtn"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        key="prev"
      >
        &lt;
      </button>

      {currentGroupPages.map((page) => (
        <button
          key={page}
          className={`shiftBtn ${currentPage === page ? "active" : ""}`}
          onClick={(e) => handlePageChange(page, e)}
        >
          {page}
        </button>
      ))}

      <button
        className="shiftBtn"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        key="next"
      >
        &gt;
      </button>
    </div>
  );
}

export default React.memo(Pagination);
