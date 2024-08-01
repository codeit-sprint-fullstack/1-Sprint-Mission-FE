import { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange, resetPageGroup }) {
  const [pageGroup, setPageGroup] = useState(0);
  const pagesPerGroup = 5;

  useEffect(() => {
    if (resetPageGroup) {
      setPageGroup(0);
    }
  }, [resetPageGroup]);

  const handlePageClick = (pageNum) => {
    onPageChange(pageNum);
  };

  const handlePageGroupChange = (direction) => {
    if (direction === "prev" && pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      onPageChange(pageGroup * pagesPerGroup);
    } else if (
      direction === "next" &&
      (pageGroup + 1) * pagesPerGroup < totalPages
    ) {
      setPageGroup(pageGroup + 1);
      onPageChange((pageGroup + 1) * pagesPerGroup + 1);
    }
  };

  const currentGroupPages = Array.from(
    { length: Math.min(pagesPerGroup, totalPages - pageGroup * pagesPerGroup) },
    (_, i) => pageGroup * pagesPerGroup + i + 1
  );

  return (
    <div className="page-container">
      <div className="page">
        <button
          onClick={() => handlePageGroupChange("prev")}
          disabled={pageGroup === 0}
        >
          &lt;
        </button>
        {currentGroupPages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            className={currentPage === pageNum ? "active" : ""}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={() => handlePageGroupChange("next")}
          disabled={(pageGroup + 1) * pagesPerGroup >= totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
