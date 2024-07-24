import React from "react";
import "./PageShift.css";

export function Shift({ currentPage, onPageChange, totalPages }) {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="btnContainer">
      <button
        className="shiftBtn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`shiftBtn ${currentPage === i + 1 ? "active" : ""}`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="shiftBtn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
