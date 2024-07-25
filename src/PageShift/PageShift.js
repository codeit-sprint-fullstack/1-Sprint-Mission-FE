import React, { useState } from "react";
import "./PageShift.css";

export function Shift({ currentPage, onPageChange, totalPages }) {
  // 페이지 그룹을 관리하기 위한 state 추가
  const [pageGroup, setPageGroup] = useState(0);
  const pagesPerGroup = 5; // 한 그룹당 페이지 수

  // 실제 페이지 변경 처리 함수
  const handlePageChange = (page, event) => {
    event.preventDefault();
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  // 페이지 그룹 변경 처리 함수
  const handleGroupChange = (direction, event) => {
    event.preventDefault();
    if (direction === "next" && (pageGroup + 1) * pagesPerGroup < totalPages) {
      setPageGroup(pageGroup + 1);
    } else if (direction === "prev" && pageGroup > 0) {
      setPageGroup(pageGroup - 1);
    }
  };

  // 현재 페이지 그룹 계산
  const currentGroupPages = Array.from(
    { length: Math.min(pagesPerGroup, totalPages - pageGroup * pagesPerGroup) },
    (_, i) => pageGroup * pagesPerGroup + i + 1
  );

  return (
    <div className="btnContainer">
      <button
        className="shiftBtn"
        onClick={(e) => handleGroupChange("prev", e)}
        disabled={pageGroup === 0}
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
        onClick={(e) => handleGroupChange("next", e)}
        disabled={(pageGroup + 1) * pagesPerGroup >= totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
