import React, { useState } from "react";
import "./Pagination.css";

export function Shift({ currentPage, onPageChange, totalPages }) {
  // 페이지 그룹을 관리하기 위한 state 추가
  const [pageGroup, setPageGroup] = useState(0);
  const pagesPerGroup = 5; // 한 그룹당 페이지 수

  // 실제 페이지 변경 처리 함수
  const handlePageChange = (page, event) => {
    event.preventDefault(); // 기본 이벤트 동작 방지
    // 페이지 번호가 1보다 작거나 총 페이지 수 초과 하면 종료
    if (page < 1 || page > totalPages) return;
    onPageChange(page); // 콜백 함수 호출
  };

  // 페이지 그룹 변경 처리 함수
  const handleGroupChange = (direction, event) => {
    event.preventDefault(); // 기본 이벤트 동작 방지
    // next 방향 && 다음 페이지 && 총 페이지 수 초과 X
    if (direction === "next" && (pageGroup + 1) * pagesPerGroup < totalPages) {
      setPageGroup(pageGroup + 1);
    } else if (direction === "prev" && pageGroup > 0) {
      setPageGroup(pageGroup - 1);
    }
  };

  // 현재 페이지 그룹 계산
  const currentGroupPages = Array.from(
    // 페이지 수 계산 (현재 그룹에서 가능한 페이지 수 만큼 생성)
    { length: Math.min(pagesPerGroup, totalPages - pageGroup * pagesPerGroup) },
    (_, i) => pageGroup * pagesPerGroup + i + 1 // 페이지 번호 생성
  );

  return (
    <div className="btnContainer">
      <button
        className="shiftBtn"
        onClick={(e) => handleGroupChange("prev", e)} // 이전 버튼 클릭
        disabled={pageGroup === 0}
      >
        &lt;
      </button>

      {currentGroupPages.map(
        (
          page // 페이지 번호 버튼 생성
        ) => (
          <button
            key={page}
            className={`shiftBtn ${currentPage === page ? "active" : ""}`}
            onClick={(e) => handlePageChange(page, e)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="shiftBtn"
        onClick={(e) => handleGroupChange("next", e)} // 다음 버튼 클릭
        disabled={(pageGroup + 1) * pagesPerGroup >= totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
