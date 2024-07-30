import React, { useState } from "react";
import "./Pagination.css";

export function Shift({ currentPage, onPageChange, totalPages }) {
  const [pageGroup, setPageGroup] = useState(0);
  const pagesPerGroup = 5;

  const handlePageChange = (page, event) => {
    event.preventDefault(); // 기본 이벤트 동작 방지
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  // 페이지 그룹 변경 처리 함수
  const handleGroupChange = (direction, event) => {
    event.preventDefault(); // 기본 이벤트 동작 방지
    if (direction === "next" && (pageGroup + 1) * pagesPerGroup < totalPages) {
      setPageGroup(pageGroup + 1);
    } else if (direction === "prev" && pageGroup > 0) {
      setPageGroup(pageGroup - 1);
    }
  };

  // 현재 페이지 그룹 계산
  const currentGroupPages = Array.from(
    { length: Math.min(pagesPerGroup, totalPages - pageGroup * pagesPerGroup) },
    (_, i) => pageGroup * pagesPerGroup + i + 1 // 페이지 번호 생성
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
          className={`shiftBtn ${currentPage === page && "active"}`}
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
